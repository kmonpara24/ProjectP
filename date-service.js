const fs = require('fs').promises;
const path = require('path');

// Declare arrays to store data
let vehicles = [];
let brands = [];

// Function to initialize data
function initialize() {
  return new Promise((resolve, reject) => {
    const vehiclesPath = path.join(__dirname, 'data/vehicles.json');
    const brandsPath = path.join(__dirname, 'data/brands.json');

    fs.readFile(vehiclesPath, 'utf8')
      .then((data) => {
        vehicles = JSON.parse(data);

        // Read the brands file once the vehicles file is successfully loaded
        return fs.readFile(brandsPath, 'utf8');
      })
      .then((data) => {
        brands = JSON.parse(data);

        // Resolve the promise to indicate successful initialization
        resolve();
      })
      .catch((err) => {
        reject(`Error initializing data: ${err}`);
      });
  });
}

// Function to get all vehicles
function getAllVehicles() {
  return new Promise((resolve, reject) => {
    if (vehicles.length === 0) {
      reject('No vehicles found');
    } else {
      resolve(vehicles);
    }
  });
}

// Function to get vehicles for the year 2023
function get2023Vehicles() {
  return new Promise((resolve, reject) => {
    const vehicles2023 = vehicles.filter((vehicle) => vehicle.year === 2023);
    if (vehicles2023.length === 0) {
      reject('No vehicles for the year 2023 found');
    } else {
      resolve(vehicles2023);
    }
  });
}

// Function to get all brands
function getBrands() {
  return new Promise((resolve, reject) => {
    if (brands.length === 0) {
      reject('No brands found');
    } else {
      resolve(brands);
    }
  });
}

module.exports = {
  initialize,
  getAllVehicles,
  get2023Vehicles,
  getBrands,
};
