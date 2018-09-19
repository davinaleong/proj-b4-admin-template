const express = require('express');
const path = require('path');

const app = express();

const config = {
    root: './',
    dir: './dist',
    port: 3000
};

app.use(express.static(config.dir));
app.use(`/${config.dir}`, express.static(path.join(__dirname, config.dir)));
app.use(`/${config.root}`, express.static(path.join(__dirname, config.root)));

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}.`);
});