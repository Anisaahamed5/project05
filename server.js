import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {register, login} from './src/routes/users.js';
import {getFeed, getQuestion, createQuestion, answerQuestion} from './src/routes/questions.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Post request creates the user
app.post('/api/register', async (req, res) => {
  let result = await register(req.body.username, req.body.password);
  res.send(result);
});

// Post requests user login
app.post('/api/login', async (req, res) => {
  let result = await login(req.body.username, req.body.password);
  res.send(result);
});

// Get Questions for category
app.get('/api/:category/feed', async (req, res) => {
  let result = await getFeed(req.params.category);
  res.send(result);
});

// Get a Question
app.get('/api/questions/:id', async (req, res) => {
  let result = await getQuestion(req.params.id);

  if(result != null) {
    res.send(result);
  } else {
    res.status(404);
    res.send('404: Question Not Found');
  }
});

// Create a Question
app.post('/api/questions', async (req, res) => {
  let result = await createQuestion(req.body.user_id, req.body.text, req.body.category);
  
  res.status(200);
  res.send();
});

// Answer a Question
app.post('/api/questions/:question_id', async (req, res) => {
  let result = await answerQuestion(req.body.text, req.body.user_id, req.params.question_id);

  res.status(200);
  res.send();
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));