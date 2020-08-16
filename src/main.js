import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createSortTemplate} from "./view/sort.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createTaskTemplate} from "./view/task.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";

const render = (containter, template, place) => {
  containter.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(), `afterbegin`);


render(taskListElement, createTaskTemplate(), `beforeend`);
render(taskListElement, createTaskTemplate(), `beforeend`);
render(taskListElement, createTaskTemplate(), `beforeend`);

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
