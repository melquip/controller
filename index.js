const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/users', (req, res) => {
	res.json(users);
});
app.get('/user/:id', (req, res) => {
	const user = users.filter(user => user.id.toString() === req.params.id);
	console.log(req.params, user)
	res.json(user);
});
app.get('*', (req, res) => {
	res.status(404).json({ message: 'no such endpoint' });
});
app.listen(4000, () => {
	console.log('listening on 4000');
});
