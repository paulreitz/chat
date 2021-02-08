const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

const UserController = require('./controllers/UserController');

const router = express.Router();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const __userController = new UserController(router);

app.use('/api', router);

app.use(express.static(publicPath));

app.get('*', (__req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

