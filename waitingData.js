let a = 20, b = 0;

console.log(a+b);

let waitingData = new Promise((resolve, reject)=>{

    setTimeout(()=>{
        resolve(30);
    }, 2000)
    
});

waitingData.then((data)=>{
    b=data;
    console.log(a+b);
});

console.log(a+b);
