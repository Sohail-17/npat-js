const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.statid(path.join(__dirname, '../frontend')));

function readData() {
    return JSON.parse(fs.readFileSync('./backend/data.json', 'utf8'));
}

function writeData() {
    fs.writeFileSync('./backend/data.json', JSON.stringify(DataTransfer, null, 2));
}
app.post('/home', (req, res) => {
    const { name, place } = req.body;
    if (!name && !place) {
        score =0;
        return res.send(`You have scored ${score} lmao`);
    }
    else if (!name && place) {
        score =10;
        return res.send(`You have scored ${score}`);
    }
    else if (name && !place) {
        score =10;
        return res.send(`You have scored ${score}`);
    }
    else {
        score =20;
        return res.send(`Congrats! You have scored ${score}`);
    }
});

app.get('/home', (req, res) => res.sendFile(path.join(__dirname, '../frontend/home.html')));

console.log(`Server running at http://localhost:${PORT}`);