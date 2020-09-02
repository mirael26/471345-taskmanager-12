import AbstractView from "./abstract.js";

export default class LoadMoreButton extends AbstractView {

  _getTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
