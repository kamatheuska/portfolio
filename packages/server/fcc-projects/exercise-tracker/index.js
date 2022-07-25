const express = require('express');
const path = require('path');
const cors = require('cors');

const staticsFolder = path.join(__dirname, 'public');

module.exports = (app, { fccOptions, rootPath }) => {
    app.use(rootPath, cors(fccOptions), express.static(staticsFolder));

    app.get(rootPath, cors(fccOptions), (req, res) => {
        res.sendFile(path.join(__dirname, '/views/index.html'));
    });

    app.post(`${rootPath}/api/users`, (req, res) => {
        console.log(req.hostname);
    });
};
