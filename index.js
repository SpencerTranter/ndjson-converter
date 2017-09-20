const _       = require('lodash');
const flatten = require('flat');
const fs      = require('fs');
const moment  = require('moment');
const samples = require('auto-load')('input');

const RX    = /[0-9A-Z]{16}([0-9]*)/;

var pad = function (n) {

  return (n < 10) ? (`0${n}`) : n;

};

new Promise((resolve) => {

  fs.stat('output', (err) => {

    if (err) {

      fs.mkdir('output', () => {

        console.log('Output folder doesn\'t exist, so I made the folder');
        resolve();

      });

    }
    else resolve();

  });

}).then(() => {

  _.forEach(samples, (value, key) => {

    const flat = flatten(value);
    const d = new Date(key.match(RX)[1] * 1000);
    flat.stamp = `${[d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}`;
    const json = `${JSON.stringify(flat)}\n`;

    fs.appendFile(`./output/${moment().format()}.json`, json, 'utf8', (err) => {

      if (err) throw err;

    });

  });

});
