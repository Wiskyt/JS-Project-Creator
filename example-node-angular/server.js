require('colors');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

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
});
