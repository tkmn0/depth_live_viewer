const express = require("express");
const app = express();
const path = require('path');
const expressWs = require('express-ws')(app);
const wss = expressWs.getWss();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", function (req, res, next) {
    res.render("index", {});
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        bloadcast(ws, msg);
    });
});

const bloadcast = (ws, data) => {
    wss.clients.forEach((client) => {
        if (client !== ws) {
            client.send(data);
        }
    });
};

const server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});