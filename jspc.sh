#!/usr/bin/env bash

RCol='\x1B[0m'    # Text Reset

# Regular           Bold                Underline           High Intensity      BoldHigh Intens     Background          High Intensity Backgrounds
Bla='\x1B[0;30m';     BBla='\x1B[1;30m';    UBla='\x1B[4;30m';    IBla='\x1B[0;90m';    BIBla='\x1B[1;90m';   On_Bla='\x1B[40m';    On_IBla='\x1B[0;100m';
Red='\x1B[0;31m';     BRed='\x1B[1;31m';    URed='\x1B[4;31m';    IRed='\x1B[0;91m';    BIRed='\x1B[1;91m';   On_Red='\x1B[41m';    On_IRed='\x1B[0;101m';
Gre='\x1B[0;32m';     BGre='\x1B[1;32m';    UGre='\x1B[4;32m';    IGre='\x1B[0;92m';    BIGre='\x1B[1;92m';   On_Gre='\x1B[42m';    On_IGre='\x1B[0;102m';
Yel='\x1B[0;33m';     BYel='\x1B[1;33m';    UYel='\x1B[4;33m';    IYel='\x1B[0;93m';    BIYel='\x1B[1;93m';   On_Yel='\x1B[43m';    On_IYel='\x1B[0;103m';
Blu='\x1B[0;34m';     BBlu='\x1B[1;34m';    UBlu='\x1B[4;34m';    IBlu='\x1B[0;94m';    BIBlu='\x1B[1;94m';   On_Blu='\x1B[44m';    On_IBlu='\x1B[0;104m';
Pur='\x1B[0;35m';     BPur='\x1B[1;35m';    UPur='\x1B[4;35m';    IPur='\x1B[0;95m';    BIPur='\x1B[1;95m';   On_Pur='\x1B[45m';    On_IPur='\x1B[0;105m';
Cya='\x1B[0;36m';     BCya='\x1B[1;36m';    UCya='\x1B[4;36m';    ICya='\x1B[0;96m';    BICya='\x1B[1;96m';   On_Cya='\x1B[46m';    On_ICya='\x1B[0;106m';
Whi='\x1B[0;37m';     BWhi='\x1B[1;37m';    UWhi='\x1B[4;37m';    IWhi='\x1B[0;97m';    BIWhi='\x1B[1;97m';   On_Whi='\x1B[47m';    On_IWhi='\x1B[0;107m';

clear
echo -e "${Gre}"
echo -e "＜￣｀ヽ、　　　　　　　／ ￣ ＞"
echo -e "　ゝ、　　＼　／⌒ヽ,ノ 　  /´"
echo -e "　　　ゝ、   （ ( ͡◉ ͜> ͡◉) ／"
echo -e "　　 　　>　 　 　,ノ"
echo -e "　　　　　∠_,,,/´"
echo
echo -e "${Blu}  JS Project creator v0.2.3"
echo -e "${Whi}"

read -p "Enter project name: " name

 # Convert to Lower Case
nameLower=`echo "console.log('$name'.toLowerCase());" | node`

echo -e "${Yel}"
read -p "Use Angular ? (y/n) " -n 1 -r angular
echo -e "${Whi}"

if [[ $angular =~ ^[Nn]$ ]]
then
   read -p "Use JQuery ? (y/n) " -n 1 -r jquery
   echo -e
   ## MAYBE BOOTSTRAP?
   if [[ $jquery =~ ^[Yy]$ ]]
   then
      read -p "\tUse Bootstrap ? (y/n) " -n 1 -r bootstrap
      echo -e
   fi
fi

## Some server ma nigga?
echo -e "${Gre}"
read -p "Use NodeJS ? (y/n) " -n 1 -r node
echo -e "${Whi}"

echo -e
echo -e "${Red}(Works only if shell command 'code' is present)${Whi}"
read -p "Fast mode ? (y/n) " -n 1 -r fast
echo -e 
echo -e
echo -e "${Gre}Creating configuration for $name${Whi}"
echo -e

mkdir "$name"
cd "$name"

## NOT ANGULAR ? OKAY
if [[ $angular =~ ^[Nn]$ ]]
then
   mkdir js
   mkdir img
   mkdir css

   printf "html, body {\n\twidth: 100%%;\n\theight: 100%%;\n}" > css/style.css

   if [[ $jquery =~ ^[Yy]$ ]]
   then
      if [[ $bootstrap =~ ^[Yy]$ ]]
      then
         echo -e "<!doctype html>
<html>
<head>
   <title></title>
   <meta charset='UTF-8'>
   <meta name='' content=''>
   <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
   <link rel='stylesheet' href='css/style.css'>
</head>
<body>

   <h1> Hello Bootstrap ! </h1>

   <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
   <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
   <script src='js/main.js'></script>
</body>
</html>" > index.html


      else
         echo -e "<!doctype html>
<html>
<head>
   <title></title>
   <meta charset='UTF-8'>
   <meta name='' content=''>
   <link rel='stylesheet' href='css/style.css'>
</head>
<body>

   <h1> Hello jQuery ! </h1>

   <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
   <script src='js/main.js'></script>
</body>
</html>" > index.html 
      fi

      printf "\$(function() {\n\t\n})" > js/main.js
   else
      printf "document.addEventListener('DOMContentLoaded', function(event) {\n\t\n});" > js/main.js
      printf "<!doctype html>\nhtml>head(title+meta[charset='UTF-8']+meta[name='' content='']*2+link[href='css/style.css'])+body>script[src='js/main.js']" > index.html

   fi

else # Angular
   if [[ $node =~ ^[Yy]$ ]]
   then
      # Server.js
      echo "require('colors');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// On autorise plus de requêtes pour éviter les soucis
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json());

app.use(express.static('public')); // On distribue le dossier public

// ~~~~~~~~~~~~~ ROUTING ~~~~~~~~~~~~~~~

app.get('/myRoute/:myParam', function(req, res) {
    console.log('GET Request at myRoute with Param : ', req.params.myParam);
});

// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

let server = app.listen(9000, '127.0.0.1', function() {
    let serverInfo = server.address();
    console.log(('\n\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
    console.log('Ready to Roll !'.america);
    // On utilise .couleur aprés un string pour un max de style quand on débug
});" > server.js

      npm init -f

      echo '{
  "name": "'$nameLower'",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}' > package.json

      npm i body-parser express colors --save
      mkdir public
      cd public
      fi
   mkdir views
   mkdir components
   mkdir data
   mkdir controllers

   # Index.html
   echo -e "<!DOCTYPE html>
<html lang='en' ng-app='$nameLower'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>$name</title>
    <link rel='stylesheet' href=''>
</head>

<body>
    <header></header>
    <ui-view></ui-view>

    <script src='/node_modules/angular/angular.min.js'></script>
    <script src='node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'></script>
    <script src='/app.js'></script>
    <script src='/components/home/home.js'></script>
</body>

</html>" > index.html


      # APP JS
   echo -e "'use strict'

const config = [
    '\$stateProvider',
    '\$urlRouterProvider',
    Config
]

const run = [
    '\$state',
    Run
]

angular.module('$nameLower', [
   'ui.router'
    // HERE LIST YOUR MODULES
])

.config(config)
    .run(run)

function Config(\$stateProvider, \$urlRouterProvider) {
    const states = [{
        name: 'home',
        url: '/',
        component: 'home'
    }];

    states.forEach((state) => {
        \$stateProvider.state(state)
    });

   \$urlRouterProvider.otherwise('/');
}

function Run(\$state) {
    if (!navigator.onLine) {
        \$state.go('offline')
    }
}" > app.js

   npm init -f
   npm i angular @uirouter/angularjs --save

   cd components
   mkdir home
   cd home
   echo -e "<h1> Hello World !</h1>" > home.html
   echo -e "'use strict'

angular.module('$nameLower')

.component('home', {
    templateUrl: '/components/home/home.html',
    controller: Home
})

function Home($scope) {
    // Controller
}" > home.js
   cd ../../../
fi

echo -e
echo -e
echo -e "${Gre}Done. Enjoy ( ͡° ͜ʖ ͡°)"

if [[ $fast =~ ^[Yy]$ ]]
   then
   if [[ $angular =~ ^[Nn]$ ]] # Classic JS
   then
      code index.html
      code js/main.js
      code css/style.css

      if [ "$(uname)" == "Darwin" ]; then # OSX
         open index.html       
      elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then # Linux
         xdg-open index.html
      fi

   else  # Angular
      code public/index.html public/app.js public/components/home/home.js public/components/home/home.html
   fi

   if [[ $node =~ ^[Yy]$ ]]
   then
      code server.js
      open "http://127.0.0.1:9000"
   fi
   
fi

if [[ $node =~ ^[Yy]$ ]]
then
   echo -e "${On_IGre}${Whi}Go into $name and use ${Yel}npm start ${Whi}to launch the server ! (Nodemon ${Red}required${Whi} in global)"
fi

echo -e
sleep 1