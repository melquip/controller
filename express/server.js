const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');
const serverless = require('serverless-http');

const app = express();
//https://github.com/neverendingqs/netlify-express/
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
const users = [
	{
		id: 1,
		username: "Rui",
		data: {
			temp: 20,
		}
	},
	{
		id: 2,
		username: "Melqui",
		data: {
			temp: 27,
		}
	},
	{
		id: 3,
		username: "John",
		data: {
			temp: 16,
		}
	},
];


router.get('/', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.json({ hello: "from controller api!"});
	res.end();
});
router.get('/users', (req, res) => {
	res.json({ users: users });
});
router.get('/user/:id', (req, res) => {
	const user = users.filter(user => user.id.toString() === req.params.id);
	res.json(user);
});
router.get('*', (req, res) => {
	res.status(404).json({ message: 'no such endpoint' });
});
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

/*
app.listen(4000, () => {
	console.log('listening on 4000');
});
*/
module.exports = app;
module.exports.handler = serverless(app);