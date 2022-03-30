import express, { urlencoded } from 'express';
import {
    codeController,
    commitsController,
    issuesController,
    labelsController,
    repositoriesController,
    topicsController,
    usersController
}from '../controller/index.js';
import cors from 'cors';
// import CommitsController from '../controller/CommitsController.js';

// const commitsController = new CommitsController();

const app = express();

app.use(cors())

app.use((req, res, next)=>{
    console.log(req.method, 'received at ', req.url);
    next();
});


app.use(urlencoded({extended:true}))


app.get('/code',codeController.autoComplete);
app.get('/commits',commitsController.autoComplete);
app.get('/issues',issuesController.autoComplete);
app.get('/labels',labelsController.autoComplete);
app.get('/repositories',repositoriesController.autoComplete);
app.get('/topics',topicsController.autoComplete);
app.get('/users',usersController.autoComplete);

export default app;