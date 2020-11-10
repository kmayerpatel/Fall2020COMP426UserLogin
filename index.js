const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Secret = require("./Secret.js");

app.get('/secret', (req, res) => {
    res.json(Secret.getAllIDs());
    return;
});

app.get('/secret/:id', (req, res) => {
    let s = Secret.findByID(req.params.id);

    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    res.json(s);
} );

app.post('/secret', (req, res)=> {
    let s = Secret.create(req.body.secret);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

app.put('/secret/:id', (req, res) => {
    let s = Secret.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }
    s.update(req.body.secret);

    res.json(s.id);
});

app.delete('/secret/:id', (req, res) => {
    let s = Secret.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    s.delete();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("User Login Example up and running on port " + port);
});


