const fs = require("fs");
const path = require("path");

const sendData = (filter, map, reject) => {
  let pathFile = path.resolve(__dirname, "../..", "db/products/products-mock.json");
  fs.readFile(pathFile, (err, data) => {
    let dataProducts = JSON.parse(data);
    let products = dataProducts.filter(filter).map(map);
    reject(products);
  });
};
module.exports = sendData;