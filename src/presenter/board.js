import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskEditView from "../view/task-edit.js";
import TaskView from "../view/task.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import TaskListView from "../view/task-list.js";
import NoTasksView from "../view/no-tasks.js";
import {render, replace, remove} from "../utils/render.js";

const TASK_COUNT_PER_STEP = 8;
const START_TASK_COUNT = 0;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._startTaskCount = START_TASK_COUNT;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTasksView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    render(this._boardContainer, this._boardComponent, `beforeend`);
    render(this._boardComponent, this._taskListComponent, `beforeend`);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, `afterbegin`);
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskListComponent, taskComponent, `beforeend`);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, `afterbegin`);
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMoreButtonComponent, `beforeend`);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderTaskList() {
    this._renderTasks(this._startTaskCount, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.length === 0 || this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTaskList();
  }
}
