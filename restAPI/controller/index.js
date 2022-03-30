import CodeController from "./CodeController.js";
import codeServices from "../service/codeServices.js";
import CommitsController from "./CommitsController.js";
import commitsServices from "../service/commitsServices.js";
import IssuesController from "./IssuesController.js";
import issuesServices from "../service/issuesServices.js";
import LabelsController from "./LabelsServices.js";
import labelsServices from "../service/labelsServices.js";
import RepositoriesController from "./RepositoriesController.js";
import repositoriesServices from "../service/repositoriesServices.js";
import TopicsController from "./TopicsController.js";
import topicsServices from "../service/topicsServices.js";
import UsersController from "./UsersController.js";
import usersServices from "../service/usersServices.js";


const codeController = new CodeController(codeServices);
const commitsController = new CommitsController(commitsServices);
const issuesController = new IssuesController(issuesServices);
const labelsController = new LabelsController(labelsServices);
const repositoriesController = new RepositoriesController(repositoriesServices);
const topicsController = new TopicsController(topicsServices);
const usersController = new UsersController(usersServices);

export {codeController,commitsController,issuesController, labelsController, repositoriesController, topicsController, usersController};