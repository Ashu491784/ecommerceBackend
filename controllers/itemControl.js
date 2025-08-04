
const Item = require("../models/ItemModel");

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
module.exports = {createItem, getAll}