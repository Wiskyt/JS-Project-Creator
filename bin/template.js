'use strict';

var fs = require('fs');

function Template(name, extension) {
   this.char = "%%";
   this.name = name;
   this.extension = extension || 'js';
   this.file = fs.readFileSync(__dirname + '/../templates/' + name.toLowerCase() + '.template', 'utf8');
}

Template.prototype.construct = function (options) {
   this.holders = this.getHolders();

   for (let i = 0; i < this.holders.length; i++) {
      let h = this.holders[i];

      this.file = this.file.replace(/%%name%%/g, options.name); // Just do it first because its recurring

      switch (h.text) {
         case 'dependencies':
            this.file = this.file.replace(/%%dependencies%%/g, this.constructDependencies(options))
            break;
         case 'scriptInclusions':
            this.file = this.file.replace(/%%scriptInclusions%%/g, this.constructScriptInclusions(options))
            break;
         case 'cssInclusions':
            this.file = this.file.replace(/%%cssInclusions%%/g, this.constructCssInclusions(options))
            break;
         case 'componentsInclusions':
            this.file = this.file.replace(/%%componentsInclusions%%/g, this.constructComponentInclusions(options))
            break;
         case 'port':
            this.file = this.file.replace(/%%port%%/g, options.port)
            break;

      }
   }
}

/*
   Finds all occurences of the special template char and returns them as object with pos and text
*/
Template.prototype.getHolders = function () {
   var holders = [], start = 0;

   while (this.file.indexOf(this.char, start) > 0) { // as long as there is occurences to be found

      start = this.file.indexOf(this.char, start); // first delimiter
      let end = this.file.indexOf(this.char, start + 1); // next occurence

      let obj = {
         pos: start,
         text: this.file.substr(start + this.char.length, end - start - this.char.length) // take string without the special characters
      }

      start = end + this.char.length; // prepare for next occurence
      holders.push(obj);
   }

   return holders;
}

/*
   Write file to disk
*/
Template.prototype.save = function (path) {
   fs.writeFile(path + '/' + this.name.toLowerCase() + '.' + this.extension, this.file, (err) => {
      if (err) {
         return console.log(err);
      }
   });
}


/*
   Static generator functions
*/
Template.prototype.constructDependencies = function (options) {
   let modules = ["'ui.router'"];
   if (options.resource) {
      modules.push("'ngResource'");
   }

   return modules.join(',\n   ');
}

Template.prototype.constructScriptInclusions = function (options) {
   let scripts = ["<script src='./node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'></script>"];

   if (options.bootstrap) {
      scripts.push("<script src='./node_modules/bootstrap/dist/js/bootstrap.min.js'></script>");
   } else if (options.materialize) {
      scripts.push("<script src='./node_modules/materialize-css/dist/js/materialize.min.js'></script>");
   } 
   
   if (options.resource) {
      scripts.push("<script src='./node_modules/angular-resource/angular-resource.min.js'></script>");
   }

   return scripts.join('\n    ');
}

Template.prototype.constructComponentInclusions = function (options) {
   let scripts = [];

   let c = options.components;
   for (let i = 0; i < c.length; i++) {
      scripts.push("<script src='./components/" + c[i] + "/" + c[i] + ".js'></script>");
   }

   return scripts.join('\n    ');
}

Template.prototype.constructCssInclusions = function (options) {
   let css = ["<link href='./index.css'>"]

   if (options.bootstrap) {
      css.push("<link href='./node_modules/bootstrap/dist/css/bootstrap.min.css'>");
      css.push("<link href='./node_modules/bootstrap/dist/css/bootstrap-theme.min.css'>");
   } else if (options.materialize) {
      css.push("<link href='./node_modules/materialize-css/dist/css/materialize.min.css'>");
   }

   let c = options.components;
   for (let i = 0; i < c.length; i++) {
      css.push("<link href='./components/" + c[i] + "/" + c[i] + ".css'>");
   }

   return css.join('\n    ');
}

module.exports = Template;