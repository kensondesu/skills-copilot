//scrapping of a given external url extracting product name and price
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const path = require('path');

//function to scrap the given url
function scrap(url, callback) {
    request(url, function(err, res, body) {
        if (err) {
            callback(err);
        } else {
            let $ = cheerio.load(body);
            let product = $('.product-title').text().trim();
            let price = $('.price').text().trim();
            let result = {
                product: product,
                price: price
            };
            callback(null, result);
        }
    });
}

//function to write the scrapped data into a json file
function writeJsonFile(file, data, callback) {
    fs.writeFile(file, JSON.stringify(data), function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

//function to read the json file
function readJsonFile(file, callback) {
    fs.readFile(file, function(err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
}

//function to scrap the url and write the data into a json file
function scrapAndWrite(url, file, callback) {
    scrap(url, function(err, data) {
        if (err) {
            callback(err);
        } else {
            writeJsonFile(file, data, function(err, data) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        }
    });
}

//function to scrap the url and write the data into a json file
function scrapAndRead(url, file, callback) {
    scrap(url, function(err, data) {
        if (err) {
            callback(err);
        } else {
            readJsonFile(file, function(err, data) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        }
    });
}

//function to scrap the url and write the data into a json file
function scrapAndReadAndWrite(url, file, callback) {
    scrap(url, function(err, data) {
        if (err) {
            callback(err);
        } else {
            readJsonFile(file, function(err, data) {
                if (err) {
                    callback(err);
                } else {
                    writeJsonFile(file, data, function(err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, data);
                        }
                    });
                }
            });
        }
    });
}
