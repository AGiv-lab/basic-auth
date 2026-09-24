'use strict';

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function start(port) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = {
  app,
  start,
};

