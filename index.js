const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 8383;
const app = express();
app.use(cors());

app.get('/apps', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_URL);
    const sorted = response.data.sort((a, b) => {
        return b.id - a.id;
    })
    res.send(sorted)
})
app.get('/categories', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_CATEGORIES_URL);
    res.send(response)
})

app.get('/apps/category/:category', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_URL);
    const data = response.data
    const param = req.params.category
    console.log(param)
    const find = response.data.filter(d => d.category === param);
    res.json(find);
})

app.get('/apps/user/:shared', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_URL);
    const data = response.data
    const param = req.params.shared
    console.log(param)
    const find = response.data.filter(d => d.shared === param);
    res.json(find);
})

app.get('/apps/search/:search', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_URL);
    const data = response.data
    const searchString = req.params.search
    searchRegExp = new RegExp(searchString, 'i');
    const find = await data.filter(function (e) {
        return searchRegExp.test(e.lower);
    });
    res.json(find);
})

app.get('/apps/id/:id', async (req, res) => {
    const response = await axios.get(process.env.DATABASE_URL);
    const data = response.data
    const param = req.params.id
    const find = await data.find(function (e) {
        return e.id == param;
    })
    res.json(find);
})



app.listen(port);