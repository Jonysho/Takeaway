const MenuItem = require('../models/MenuModel.js')

const addMenuItem = async (req, res) => {
    const { itemId, name, type, size, ...rest } = req.body
    if (!itemId || !name || !type || !size){
        return res.status(400).json({message: "Missing all required fields."})
    }
    const exists = await MenuItem.findOne({ itemId })
    if (exists) {
        return res.status(400).json({message: `Item ID ${itemId} is already in use.`})
    }
    if (!Array.isArray(size) || !size.every(obj => obj.size && obj.price)){
        return res.status(400).json({message: "Size is inputted incorrectly."})
    }
    try {
        const item = await MenuItem.create({ itemId, name, type, size, ...rest, })
        console.log(item)
        return res.status(200).json({ item })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Failed to add new menu item."})
    }
}

const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find()
        if (!items) {
            return res.status(400).json({message: "No Items have been added to the menu."})
        }
        console.log(items)
        return res.status(200).json({ items })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Failed to get menu items."})
    }
}

const updateMenuItem = async (req, res) => {
    const { id } = req.params
    const { itemId, name, type, size, ...rest } = req.body
    if (!itemId || !name || !type || !size){
        return res.status(400).json({message: "Missing all required fields."})
    }
    const prevItem = await MenuItem.findOne({itemId: id})
    if (!prevItem) {
        return res.status(400).json({message: `Menu item ${id} not found.`})
    }
    if (itemId && itemId != id) {
        const exists = await MenuItem.findOne({ itemId })
        if (exists) {
            return res.status(400).json({message: `Item ID ${id} is already in use.`})
        }
    } 
    if (size && !Array.isArray(size) || !size.every(obj => obj.size && obj.price)) {
        return res.status(400).json({message: "Size is inputted incorrectly."})
    }
    try {
        prevItem.set({
            itemId,
            name,
            type,
            size,
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
            return res.status(400).json({message: `Menu item ${id} not found.`})
        }
        await item.deleteOne()
        return res.status(200).json({ message: `Menu Item ${id} successfully deleted.`})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: `Failed to delete Menu item ${id}.`})
    }
}

module.exports = { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem }