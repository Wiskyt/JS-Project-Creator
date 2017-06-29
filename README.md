# JS Project Creator v1.0.7

JSPC is a tool for creating starter kit Javascript projects, including AngularJS and Node.

Once launched, he will ask multiple questions to identify your needs and will create a subfolder containing all your files and folders necessary to have a good headstart in your project.

## NEW

- v0.3.0: JSPC Can now create Angular and Node templates.
- v0.3.1: Angular Component Creator (angcc.sh) is there, he templates component creation.
- v1.0 : Rewritten from Bash to NodeJS ! More powerful he can now pre-include dependencies.
- v1.0.5 : You can now specify a custom port for your server and Materialize was added.
- v1.0.7 : Option v disponible pour la version, fix des balises link

## How to use it ?

Get the package on npm and install it globally
```
npm i -g jspc
```

You can now start the tool
```
jspc
```

If you get a Syntax error make sure your node version is <a href="https://nodecasts.io/update-node-js/">up to date</a>

## Options

### --angular-component (-ac)
You can call jspc with this option when at the root of an angular project to create a new component<br />
( /!\ Doesn't automatically link the components in the index )
```
jspc -ac componentName
```


## Goals for next updates
- New libraries (React, VueJS)
- New frameworks (Materialize)
- Inheritance in Templates