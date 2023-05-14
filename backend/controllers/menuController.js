const MenuItem = require('../models/MenuModel.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

// Set storage engine for multer
const storage = new Storage({
    projectId: 'takeaway-website',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}) 

const bucket = storage.bucket('item-images-bucket');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Initialize upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

const addMenuItem = async (req, res) => {
    // Use Multer middleware to handle file upload and parse form data
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            let message
            switch (err.code){
                case 'LIMIT_FILE_SIZE':
                    message = "Image exceeds maximum file size limit (10MB)."
                    break
                case 'LIMIT_UNEXPECTED_FILE':
                    message = "The image is missing or incorrect. Please try again."
                    break
            }
            return res.status(400).json({ error: message });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ error: "The image is missing or incorrect. Please try again." });
    } try {
        const { formData } = req.body
        const data = JSON.parse(formData)
        const { itemId, name, category, portions, size, image, ...rest } = data;
        // Validate required fields
        if (!itemId || isNaN(parseInt(itemId)) || !name || !category || !portions || portions.length == 0) {
            return res.status(400).json({ error: 'Missing all required fields.' });
        }
        
        // Check if item already exists
        const exists = await MenuItem.findOne({ itemId });
        if (exists) {
            return res.status(400).json({ error: `Item ID ${itemId} is already in use.` });
        }
        
        // Check if portions array is formatted correctly
        if (!Array.isArray(portions) || !portions.every(({size, price}) => size && price)) {
            return res.status(400).json({ error: 'Portions are inputted incorrectly.' });
        }
        
        // Check image file is created
        if (!req.file) {
            return res.status(400).json({ error: "Failed to save image. Ensure an image is chosen."})
        }
        // Resize and compress the image
        const compressedImage = await sharp(req.file.buffer)
        .resize({ width: 800 }) // Resize to 800px width (or any other desired width)
        .jpeg({ quality: 80 }) // Compress to 80% JPEG quality (or any other desired quality)
        .toBuffer();
        const extension = req.file.originalname.split(".")[1]
        const imageName = `${itemId}-${name}.${extension}`
        const bucketFile = bucket.file(imageName)
        const stream = bucketFile.createWriteStream();
        stream.on('error', (err) => {
            console.log(err)
            return res.status(400).json({ error: 'Failed to save image.'})
        })
        stream.end(compressedImage)
        console.log("Uploaded")
        await MenuItem.create({ itemId, name, category, portions, image: imageName, ...rest });
        return res.status(200).json({ message: `Successfully added new menu item ${itemId}` });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Failed to add new menu item.' });
        }
    });
};

const getAllMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find()
        if (!items) {
            return res.status(400).json({error: "No Items have been added to the menu."})
        }
        return res.status(200).json( items )
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Failed to get menu items."})
    }
}

const getMenuItem = async (req, res) => {
    const { id } = req.params
    try {
        const item = await MenuItem.findOne({itemId: id})
        if (!item) {
            return res.status(400).json({error: `Cannot find Menu Item ${id}`})
        }
        let { itemId, name, category, recommended, hot, moreInfo, quantity, portions, image } = item;
        if (!quantity) quantity = ""
        return res.status(200).json({ itemId, name, category, recommended, hot, moreInfo, quantity, portions, image })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to get Menu Item ${id}`})
    }
}

const updateMenuItem = async (req, res) => {
    const { id } = req.params
    const { itemId, name, category, portions, image, ...rest } = req.body
    if (!itemId || !name || !category || !portions){
        return res.status(400).json({error: "Missing all required fields."})
    }
    const prevItem = await MenuItem.findOne({itemId: id})
    if (!prevItem) {
        return res.status(400).json({error: `Menu item ${id} not found.`})
    }
    if (itemId && itemId != id) {
        const exists = await MenuItem.findOne({ itemId })
        if (exists) {
            return res.status(400).json({error: `Item ID ${id} is already in use.`})
        }
    } 
    if (portions && !Array.isArray(portions) || portions.every(obj => obj.size == null || obj.price == null)) {
        return res.status(400).json({error: "Portions are inputted incorrectly."})
    }
    try {
        const newItem = await MenuItem.updateOne( {itemId: id}, 
            {$set: {
                name,
                category,
                portions,
                ...rest,
            }}
        )
        return res.status(200).json({message: `Successfully updated Menu item ${id}.`})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to update Menu item ${id}.`})
    }
}
 
const deleteMenuItem = async (req, res) => {
    const { id } = req.params
    try {
        const item = await MenuItem.findOne({ itemId: id })
        if (!item) {
            return res.status(400).json({error: `Menu item ${id} not found.`})
        }
        await item.deleteOne()
        const file = bucket.file(item.image)
        try {
            await file.delete()
            console.log("Successfully deleted image.")
        } catch (error) {
            console.error(err);
            return res.status(400).json({ message: 'Failed to delete image.'})
        }
        return res.status(200).json({ message: `Menu Item ${id} successfully deleted.`})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to delete Menu item ${id}.`})
    }
}
  
module.exports = { getAllMenuItems, getMenuItem, addMenuItem, updateMenuItem, deleteMenuItem }