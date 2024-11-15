const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public')

app.set('view engine', 'ejs');

app.get('', (req, resp)=>{
    resp.sendFile(`${publicPath}/index.html`)
});

app.get('/about', (req, resp)=>{
    resp.sendFile(`${publicPath}/about.html`)
});

app.get('/profile', (req, resp)=>{
    const user = {
        name: 'peter',
        email: 'peter@test.com',
        country: 'USA',
        skills: ['php', 'js', 'nodejs', 'java']
    }
    resp.render('profile',{user});
});

app.get('/login', (req, resp)=>{
    resp.render('login');
});

app.get('/contact', (req, resp)=>{
    resp.sendFile(`${publicPath}/contact.html`)
});

app.get('/form', (req, resp)=>{
    resp.sendFile(`${publicPath}/contact.html`)
});

app.get('*', (req, resp)=>{
    resp.sendFile(`${publicPath}/404.html`)
});

app.listen(5000);