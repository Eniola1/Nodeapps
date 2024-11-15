const express = require('express');
const reqFilter = require('./middleware');
const app = express();
const route= express.Router();

//make middleware

//app.use(reqFilter); This is an application based middleware.

route.use(reqFilter);

app.get('/', (res, resp)=> {
    resp.send('Welcome to Home Page');
});

app.get('/users', reqFilter, (res, resp)=> {  //single route middleware reqFilter
    resp.send('Welcome to Users Page');
});

app.get('/login', (res, resp)=> {  //single route middleware reqFilter
    resp.send('Welcome to Login Page');
});

route.get('/about', (res, resp)=> {
    resp.send('Welcome to About Page');
});

route.get('/contact', (res, resp)=> {
    resp.send('Welcome to Contact Page');
})

app.use('/', route);

app.listen(5000);