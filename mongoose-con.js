const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-comm');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String,
});

const saveInDb =async()=>{
    const Product = mongoose.model('products', productSchema);
    let data = new Product({name: "Max 121", price: 200, brand: 'maxx', category: 'Mobile'});
    const result = await data.save();
    console.log(result);
}

const updateInDb=async()=>{
    const Product = mongoose.model('products', productSchema);
    let data = await Product.updateOne({name: "Max 121"},{$set: {price: 650}})
    console.log(data);
}

const deleteInDb = async()=>{
    const Product = mongoose.model('products', productSchema);
    let data = await Product.deleteOne({name:'Max 121'});
    console.log(data);
}

const findInDb = async()=>{
    const Product = mongoose.model('products', productSchema);
    let data = await Product.find();
    console.log(data);
}

findInDb();