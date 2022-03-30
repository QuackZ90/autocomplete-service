import express, { Router } from "express";
const router=Router();

import {
    codeController,
    commitsController,
    issuesController,
    labelsController,
    repositoriesController,
    topicsController,
    usersController
}from '../controller/index.js';


router.use("/", (req, res, next) => {
    console.log("You have called the autocomplete route.");
    next();
});

router.get('/code',codeController.autoComplete);
router.get('/commits',commitsController.autoComplete);
router.get('/issues',issuesController.autoComplete);
router.get('/labels',labelsController.autoComplete);
router.get('/repositories',repositoriesController.autoComplete);
router.get('/topics',topicsController.autoComplete);
router.get('/users',usersController.autoComplete);

export default router;