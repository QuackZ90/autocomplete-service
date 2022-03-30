import express, { urlencoded } from 'express';
import autocompleteRoute from "./autocomplete.route.js";
import cors from 'cors';
// import CommitsController from '../controller/CommitsController.js';

// const commitsController = new CommitsController();

const app = express();

app.use(cors())

app.use((req, res, next)=>{
    console.log(req.method, 'received at ', req.url);
    next();
});


app.use(urlencoded({extended:true}));

app.use('/autocomplete',autocompleteRoute);



export default app;