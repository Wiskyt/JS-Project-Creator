#! /usr/bin/env node

var fs = require('fs');
var shell = require('shelljs');

var Utils = require('./utils.js');

process.on('SIGINT', function () {
   console.log("\nJSPC Terminated.\n".red);
   process.exit();
});

var prompt = require('./prompt.js');

var Template = require('./template.js');
var Component = require('./component.js');

var Progress, bar;

var exit = false;
var args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
   // Angular component
   if (args[i] == '-ac' || args[i] == '--angular-component') {
      let name = args[i + 1];
      var component = new Component(name);
      moduleName = JSON.parse(fs.readFileSync(shell.pwd().stdout + '/package.json', 'utf8')).name;
      shell.mkdir('-p', './components/' + name);
      component.construct({ name: moduleName });
      component.save(shell.pwd().stdout + '/components');
      exit = true;
      i++;
   }

   else if (args[i] == '-v' || args[i] == '--version') {
      console.log(Utils.version);
      exit = true;
   }
}

if (!exit) {
   var Progress = require('ts-progress');
   var bar = Progress.create({ total: 10, pattern: 'Progress: {bar.white.green.30} | Elapsed: {elapsed.white} | {percent.white}' });
   bar.tick = () => bar.update();
   prompt.start();
   prompt.getOptions(next);
   // next(null); // test (comment previous)
}


function next(options) {
   Utils.pleaseWait();

   /*options = { // Test for faster iterations
       name: 'Test',
       node: true,
       angular: true,
       bootstrap: true,
       resource: true,
       components: ['home', 'about', 'contact']
    }*/

   shell.mkdir('-p', "./" + options.originalName);
   shell.cd(options.name);
   let path = shell.pwd().stdout;

   var index = new Template('Index', 'html');
   index.construct(options);

   bar.tick();

   if (options.node) {
      shell.exec('npm init -f', { silent: true });
      bar.tick();

      editPackageJson(path, (package) => {
         package.name = options.name;
         package.main = 'server.js';
         package.scripts = { start: 'nodemon server.js' };
         return package;
      });
      bar.tick();

      var serverjs = new Template('Server');
      serverjs.construct(options);
      serverjs.save(path);
      bar.tick();

      shell.exec('npm i -S ' + getServerDependencies(options), { silent: true });
      bar.tick();
      // At the end of this condition block to continue on the right path for eventually angular
      shell.mkdir('-p', './public');
      shell.cd('public');
   }

   if (options.angular) {
      let path = shell.pwd().stdout;

      shell.exec('npm init -f', { silent: true });
      bar.tick();
      editPackageJson(path, (package) => {
         package.scripts = { start: 'live-server' };
         return package;
      });
      bar.tick();
      shell.exec('npm i -S ' + getClientDependencies(options), { silent: true });
      bar.tick();

      var appjs = new Template('App');
      appjs.construct(options);

      shell.mkdir('-p', './components', './data');

      saveSimpleFile(path + '/index.css', 'html, body {\n\twidth: 100%;\n\theight: 100%; margin: 0;\n}')
      appjs.save(path);
      index.save(path);
      bar.tick();

      for (let i = 0; i < options.components.length; i++) {
         if (options.components[i] == '') break;
         let c = new Component(options.components[i]);
         shell.mkdir('-p', './components/' + c.nameLower)
         c.construct(options);
         c.save(path + '/components');
      }

      bar.tick();
      Utils.byebye();
   }
}

function saveSimpleFile(fullPath, content) {
   fs.writeFile(fullPath, content, (err) => {
      if (err) {
         return console.log(err);
      }
   });
}

function getClientDependencies(options) {
   let d = 'npm i -S ';
   let arr = ['@uirouter/angularjs']; // Default

   if (options.bootstrap) {
      arr.push('bootstrap');
   } else if (options.materialize) {
      arr.push('materialize-css');
   }

   if (options.resource) {
      arr.push('angular-resource');
   } if (options.angular) {
      arr.push('angular');
   }

   return arr.join(' ');
}

function getServerDependencies(options) {
   let d = 'npm i -S ';
   let arr = ['body-parser', 'express', 'colors'];

   return arr.join(' ');
}

function editPackageJson(path, modify) {
   let package = JSON.parse(fs.readFileSync(path + '/package.json', 'utf8'));
   fs.writeFileSync(path + '/package.json', JSON.stringify(modify(package)), 'utf8');
}