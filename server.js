/****************
 * WEB322 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: __Kenil Monpara____________________
 * Student ID: ___170814214___________
 * Date: ____30-09-2023____________
 *
 * Cyclic Web App URL: _____________________
 * GitHub Repository URL: _____________________https://github.com/kmonpara24/web322
 *
 ****************/

/*============================
    require data service module.
  ============================
*/

let blogService = require('./data-service.js');
let path = require('path');

const HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
let app = express();

// Return the appropriate message.
const serverListener = (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Express http server listening on Port ${HTTP_PORT}`);
  }
};

// This serves static files.
app.use(express.static(__dirname + '/public'));

blogService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, serverListener);
  })
  .catch((error) => {
    console.error(error + ' this is from server.js');
  });

// Route to fetch all vehicles.
app.get('/vehicles', (req, res) => {
  blogService
    .getAllVehicles()
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.status(200).json(data);
    })
    .catch((err) => {
      res.header('Content-Type', 'application/json');
      res.status(500).json({ message: err });
    });
});

// Route to fetch all brands.
app.get('/brands', (req, res) => {
  blogService
    .getBrands()
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.status(200).json(data);
    })
    .catch((err) => {
      res.header('Content-Type', 'application/json');
      res.status(500).json({ message: err });
    });
});

// Return the appropriate error message when a user enters an incorrect URL.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'error.html'));
});
