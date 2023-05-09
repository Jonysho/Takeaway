const MenuItem = require('../models/MenuModel.js')
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, "Image" + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('imageFile');

const addMenuItem = async (req, res) => {
    // Use Multer middleware to handle file upload and parse form data
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Failed to upload Image.' });
        } else if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An Unknown error occured.' });
    } try {
        const { formData } = req.body
        const data = JSON.parse(formData)
        const { itemId, name, category, portions, size, image, ...rest } = data;
        console.log(data)
        
        // Validate required fields
        if (!itemId || isNaN(parseInt(itemId)) || !name || !category || !portions || portions.length == 0 || !image) {
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
        
        // Save the image file
        const savedImage = req.file ? req.file.filename : null;
        if (!savedImage) {
            return res.status(400).json({ error: "Failed to save image."})
        }
        const item = await MenuItem.create({ itemId, name, category, portions, image: savedImage, ...rest });
        console.log(item);
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
        return res.status(200).json({ items })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Failed to get menu items."})
    }
}

const getMenuItem = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const item = await MenuItem.findOne({itemId: id})
        console.log(item)
        if (!item) {
            return res.status(400).json({error: `Cannot find Menu Item ${id}`})
        }
        let { itemId, name, category, recommended, hot, moreInfo, quantity, portions } = item;
        if (!quantity) quantity = ""
        return res.status(200).json({ itemId, name, category, recommended, hot, moreInfo, quantity, portions })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to get Menu Item ${id}`})
    }
}

const updateMenuItem = async (req, res) => {
    const { id } = req.params
    const { itemId, name, category, portions, ...rest } = req.body
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
        prevItem.set({
            itemId,
            name,
            category,
            portions,
            ...rest
        })
        const newItem = await prevItem.save()
        console.log(newItem)
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
        return res.status(200).json({ message: `Menu Item ${id} successfully deleted.`})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to delete Menu item ${id}.`})
    }
}
  
module.exports = { getAllMenuItems, getMenuItem, addMenuItem, updateMenuItem, deleteMenuItem }