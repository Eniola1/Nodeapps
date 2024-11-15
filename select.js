
const dbConnection = require('./mongodb');

//One way to do it 

// dbConnection().then((resp)=>{
//     console.log(resp.find().toArray().then((data)=>{
//         console.log(data);
//     }));
// });

//Or 

const main=async ()=>{
    let data = await dbConnection();
    data = await data.find().toArray();
    console.log(data);
}

main();