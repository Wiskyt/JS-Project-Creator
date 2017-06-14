'use strict';

var fs = require('fs');

function Component(name) {
   this.char = '%%';

   this.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
   this.nameLower = name.toLowerCase();

   this.js = fs.readFileSync(__dirname + '/../templates/' + 'component.template', 'utf8');
   this.html = "<h1> Hello " + this.name + " </h1>";
   this.css = "";
}

Component.prototype.construct = function (options) {
   this.holders = this.getHolders();

   for (let i = 0; i < this.holders.length; i++) {
      let h = this.holders[i];

      this.js = this.js.replace(/%%name%%/g, options.name); // Just do it first because its recurring

      switch (h.text) {
         case 'componentNameLower':
            this.js = this.js.replace(/%%componentNameLower%%/g, this.nameLower);
            break;
         case 'componentName':
            this.js = this.js.replace(/%%componentName%%/g, this.name);
            break;
      }
   }
}

// Terrible copy paste from Template
// TODO: Implement inheritance
Component.prototype.getHolders = function () {
   var holders = [], start = 0;

   while (this.js.indexOf(this.char, start) > 0) { // as long as there is occurences to be found

      start = this.js.indexOf(this.char, start); // first delimiter
      let end = this.js.indexOf(this.char, start + 1); // next occurence

      let obj = {
         pos: start,
         text: this.js.substr(start + this.char.length, end - start - this.char.length) // take string without the special characters
      }

      start = end + this.char.length; // prepare for next occurence
      holders.push(obj);
   }

   return holders;
}

// TODO: Use function
Component.prototype.save = function (path) {
   fs.writeFile(path + '/' + this.name.toLowerCase() + '/' + this.nameLower + '.js', this.js, (err) => {
      if (err) {
         return console.log(err);
      }
   });

   fs.writeFile(path + '/' + this.name.toLowerCase() + '/' + this.nameLower + '.css', this.css, (err) => {
      if (err) {
         return console.log(err);
      }
   });

   fs.writeFile(path + '/' + this.name.toLowerCase() + '/' + this.nameLower + '.html', this.html, (err) => {
      if (err) {
         return console.log(err);
      }
   });
}

module.exports = Component;