#!/usr/bin/env bash

clear
echo "-------------------------------"
echo "＜￣｀ヽ、　　　　　　　／ ￣ ＞"
echo "　ゝ、　　＼　／⌒ヽ,ノ 　  /´"
echo "　　ゝ、   （ ( ͡◉ ͜> ͡◉) ／"
echo " 　　>　 　   　,ノ"
echo "　　　　　∠_,,,/´"
echo -e "Basic JS Project creator v0.2.1"
echo -e "\033[32m -------------------------------"
read -p "Enter project name: " name
read -p "Use JQuery ? (y/n) " -n 1 -r jquery
echo
if [[ $jquery =~ ^[Yy]$ ]]
then
   read -p "Use Bootstrap ? (y/n) " -n 1 -r bootstrap
   echo
fi
echo
read -p "Fast mode (Only if shell command 'code' is present) ? (y/n) " -n 1 -r fast
echo 
echo "Creating configuration for $name"

mkdir "$name"
cd "$name"
mkdir js
mkdir img
mkdir css

printf "html, body {\n\twidth: 100%%;\n\theight: 100%%;\n}" > css/style.css

if [[ $jquery =~ ^[Yy]$ ]]
then
   if [[ $bootstrap =~ ^[Yy]$ ]]
   then
      echo "<!doctype html>
<html>
<head>
   <title></title>
   <meta charset='UTF-8'>
   <meta name='' content=''>
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
      echo "<!doctype html>
<html>
<head>
   <title></title>
   <meta charset='UTF-8'>
   <meta name='' content=''>
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

echo "Done. Enjoy ( ͡° ͜ʖ ͡°)"
sleep 1

if [[ $fast =~ ^[Yy]$ ]]
then
   code index.html
   code js/main.js
   code css/style.css

   if [ "$(uname)" == "Darwin" ]; then
      open index.html       
   elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
      xdg-open index.html
   fi
fi