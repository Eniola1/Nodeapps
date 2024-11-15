const app= require('./apptest')
const fs = require('fs')

console.warn("code step by step");

var x = 20;
let arr = [4,1,6,5,7];
if(x == 20)
{
    console.log("matched");
}
// for(i=0; i<10; i++)
// {
//     console.log(i);
// }

console.log(arr);
console.log(arr[0]);
console.log(app.xyz());

arr.filter((item)=>{ 
    console.log(item);
})

const result = arr.filter((item)=>{
    return item===4
})

console.log(result);
fs.writeFileSync("hello.txt", "Code step by step")