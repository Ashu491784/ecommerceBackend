
const Item = require("../models/ItemModel");
const path = require("path");
const fs = require("fs");
const createItem = async(req, res) => {
    try{
        const {title, description, price } = req.body
        const image = req.file ? `/uploads/${req.file.filename}` : ``;  //image ekka thiyenwa nam upload ekata danawa
        const item = await Item.create({ title, description, price, image });
        res.status(201).json({message: "item created successfully", item});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const getAll = async (req, res) => {
  try {
    const items = await Item.find();

    
    const updatedItems = items.map((item) => ({
      ...item._doc,
      image: item.image ? `http://localhost:5000${item.image}` : null,
    }));

    res.status(200).json({ items: updatedItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Prepare update object
    let updateData = { title, description, price };

    if (req.file) {
      // Set new image path for DB
      updateData.image = `/uploads/${req.file.filename}`;

      // Fetch old item to remove old image
      const oldItem = await Item.findById(req.params.id);
      if (oldItem && oldItem.image) {
        // Clean old image path
        const imagePath = path.join(
          process.cwd(),
          'uploads',
          oldItem.image.replace('/uploads/', '')
        );

        // Delete if exists
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    // Update in MongoDB
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Send response
    res.status(200).json({
      message: 'Item updated successfully',
      item: updatedItem,
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: error.message });
  }
};


const deleteItem = async (req, res) => {
    try{
        const item = await Item.findByIdAndDelete(req.params.id);
        if(!item){
            return res.status(404).json({message: "Item not found"});
        }
        if(item.image){
            const imagePath = path.join(process.cwd(), 'uploads', item.image.replace('/uploads/', ''));
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }
        res.status(200).json({message: "Item deleted successfully"});

    }catch(error){

    }
}

const findItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item found successfully", item });
  } catch (error) {
    console.error("Error finding item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {createItem, getAll, updateItem, deleteItem, findItem}