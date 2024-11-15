const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'crud');

const filePath = `${dirname}/apple.txt`;

//write file
//fs.writeFileSync(filePath, 'This is a simple path');

//read file 
// fs.readFile(filePath,'utf-8',(err, item)=>{
//     console.log(item)
// })

//append file

// fs.appendFile(filePath, 'and the file name is apple.txt',(err)=>{
//     if(!err) console.log("file is updated");
// });

//change file name
// fs.rename(filePath, `${dirname}/fruit.txt`,(err)=>{
//     if(!err) console.log("filename is updated");
// });

//delete file
// fs.unlinkSync(`${dirname}/fruit.txt`);


//Note:Only create and delete files don't have errors.