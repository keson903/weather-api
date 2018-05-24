'use strict';

const app = require("./server");
const express = require('express');


const PORT = 3000;
const HOST = '0.0.0.0';

app.use('/', express.static('public'))

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);