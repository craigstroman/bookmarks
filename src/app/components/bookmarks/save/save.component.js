import template from './save.html';
import controller from './save.controller';

const saveBookmarkComponent = {
  bindings: {
    bookmark: '<',
    save: '&',
    cancel: '&',
  },
  template,
  controller,
  controllerAs: 'saveBookmarkCtrl',
};

export default saveBookmarkComponent;
