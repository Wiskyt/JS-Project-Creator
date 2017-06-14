# JS Project Creator v1.0

JSPC est un script de création de projets Javascript comprenant Angular et Node

Une fois lancé, il posera plusieurs questions afin de déterminer vos besoin et créera un sous-dossier comprenant les fichiers et dossiers nécécessaires pour bien se lancer dans un projet.

## NEW

- v0.3.0: JSPC Gére maintenant la création de projets Angular et Node !
- v0.3.1: Angular Component Creator (angcc.sh) est la, il accélére la création barbante des components
- v1.0 : Réécrit en Node ! Templating plus puissant pour pré-inclure ses dépendances

## Comment l'utiliser ?

Récupérez le package npm et installez le en global
```
npm i -g jspc
```

Vous pouvez ensuite démarrer l'outil
```
jspc
```

Si vous obtenez une erreur de Syntaxe à l'éxécution vérifiez que vous avez bien la <a href="https://nodecasts.io/update-node-js/">derniére version</a> de Node.

## Options

### --angular-component (-ac)
Vous pouvez utiliser jspc a la racine de votre dossier Client (typiquement /public) pour créer un nouveau component.<br />
( /!\ Ne link pas automatiquement le component dans l'index )
```
jspc -ac componentName
```


## Objectifs des prochainnes versions
- Ajout de librairies (React, VueJS..)
- Ajout de frameworks CSS (Materialize)