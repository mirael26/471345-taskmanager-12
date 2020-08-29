import {createElement} from "../util.js";

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
