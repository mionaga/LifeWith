const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/post');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/lifeWithCat'
mongoose.connect( dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFinsAndModify: false
    })
    .then(() => {
        console.log('mongodbコネクションok!!!!');
    })
    .catch(err => {
        console.log('mongodbコネクションエラー!!!!!');
        console.log(err);
    });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/posts', async(req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', { posts })
});

app.get('/posts/:id', async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', { post });
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中...');
});