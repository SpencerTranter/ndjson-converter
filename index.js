const _       = require('lodash');
const flatten = require('flat');
const fs      = require('fs');
const moment  = require('moment');
const samples = require('auto-load')('./input/2017-09-14');

const RX    = /JSON[0-9A-Z]{16}([0-9]*)/;

new Promise((resolve, reject) => {

  fs.stat('./prepped.json', (err) => {

    if (!err) {

      fs.unlink('./prepped.json', (error) => {

        if (err) reject(error);
        else {

          console.log('successfully deleted /prepped.json');
          resolve();

        }

      });

    }
    else {

      console.log('No file exists yet, creating.');
      resolve();

    }

  });

}).then(() => {

  _.forEach(samples, (value, key) => {

    const flat = flatten(value);
    const d = new Date(key.match(RX)[1] * 1000);
    flat.stamp = `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}`;
    const json = `${JSON.stringify(flat)}\n`;

    fs.appendFile(`./output/${moment().format()}.json`, json, 'utf8', (err) => {

      if (err) throw err;
      else console.log('success');

    });


  });

});
