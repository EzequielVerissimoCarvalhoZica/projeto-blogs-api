const express = require('express');
require('dotenv').config();

const userRouter = require('./middlewares/userRouter');
const categorieRouter = require('./middlewares/categorieRouter');
const postRouter = require('./middlewares/postRouter');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/categories', categorieRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
