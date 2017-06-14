require('colors');
var prompt = require('prompt');
var Utils = require('./utils.js');
var options = {};

class Prompt {
   constructor() { }

   start() {
      Utils.clearConsole();
      Utils.logIntro();

      // Removes useless text at beginning of prompt line
      prompt.message = ''.white;
      prompt.delimiter = ''.white;
      prompt.start();
   }

   getOptions(next) {
      prompt.get({
         properties: {
            name: {
               description: "Enter project name :".white
            },
            node: {
               description: "Use Node ?".white
            },
            angular: {
               description: "Use Angular ?".white
            },
            bootstrap: {
               description: "Use Bootstrap ?".white
            }
         }
      }, function (err, result) {
         options = result;
         var properties = {};

         if (isYes(options.angular)) {
            properties.resource = {
               description: "Use $resource ?".white
            }

            properties.components = {
               description: "Create Components ? List their names (e.g> about contact) [home is default]\n".white
            }
         }

         prompt.get({ properties }, function (err, result) {
            options = Object.assign(options, result); // On rajoute des propriétés a options
            options = translateOptions(options);
            next(options);
         });
      });
   }
}

module.exports = new Prompt();

function onErr(err) {
   console.log(err);
   return 1;
}

function isYes(text) {
   if (text == "y" || text == 'yy' || text == 'yyy' ||  text == "yes" || text == "Yes" || text == "YES" || text == "Y") {
      return true;
   }
   return false;
}

function isNo(text) {
   if (text == "n" || text == "no" || text == "No" || text == "NO" || text == "N") {
      return true;
   }
   return false;
}

function translateOptions(options) {
   for (var key in options) {
      if (key == "name") { // Faut pas déconner quand meme
         options['originalName'] = options[key];
         options[key] = options[key].toLowerCase();
      } else if (key == "components") {
         if (!isNo(options[key]) && options[key] != '') { // If syntax looks alright
            options[key] = options[key].split(" ");
            if (options[key].indexOf('home') < 0) options[key].push('home'); // Add home if not present
         } else {
            options[key] = ['home']; // Otherwise default to home
         }
      } else if (options.hasOwnProperty(key)) {
         options[key] = isYes(options[key]);
      }
   }

   return options;
}