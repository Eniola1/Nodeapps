const dbConnection = require('./mongodb');

const insertData=async ()=>{
    let data = await dbConnection();
    let result = await data.insertOne({name: 'S3', brand: 'Nokia', price: 700, category: 'mobile'});

    if(result.acknowledged)
    {
        console.warn('data is inserted');
    }

    result = await data.insertMany([{name: 'S3', brand: 'Nokia', price: 700, category: 'mobile'},
            {name: 'S7', brand: 'New', price: 750, category: 'mobile'}]);
    console.log(result);

    if(result.acknowledged)
    {
        console.warn('data is inserted');
    }
};

insertData();