const dbConnection = require('./mongodb');

const updateData=async ()=>{

    let data = await dbConnection();
    let result = data.updateOne(
        {name: 'iphone max pro'},
        {$set: {name: 'iphone max pro 7', price: 1270}})
    console.log(data);

}

updateData();