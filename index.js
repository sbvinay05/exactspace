const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api', (req, res) => {
  const json_data = req.body.json_data;
  const parsed_data = JSON.parse(json_data) || {};
  res.render('temp', { json_data: parsed_data });
});

app.use((req, res) => {
  res.status(400).json({ error: 'Invalid request' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
