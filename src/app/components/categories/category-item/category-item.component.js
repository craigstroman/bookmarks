import template from './category-item.html';

const categoryItemComponent = {
  bindings: {
    category: '<',
    selected: '&',
  },
  template,
  controllerAs: 'categoryItemCtrl',
};

export default categoryItemComponent;
