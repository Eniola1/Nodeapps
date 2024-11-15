module.exports= (req, resp, next)=>{
    
    if(!req.query.age)
    {
        resp.send('Please provide your age');
    }

    else if(req.query.age < 18)
    {
        resp.send('You need to be 18')
    }

    else
    {
        next();
    }
}