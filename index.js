'use strict';

const app = require("./server");
const express = require('express');

app.use('/', express.static('public'))

app.listen(3000);