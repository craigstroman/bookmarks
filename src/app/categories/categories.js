angular.module('categories', [
    'categories.bookmarks.create',
    'categories.bookmarks.edit',
    'bookmarksApp.models.categories',
    'bookmarksApp.models.bookmarks'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('bookmarksApp.categories', {
        cache: false,
        url: '/',
        views: {
          'categories@': {
            controller: 'CategoriesListCtrl as categoriesListCtrl',
            templateUrl: 'app/categories/categories.tmpl.html'
          },
          'bookmarks@': {
            controller: 'BookmarksListCtrl as bookmarksListCtrl',
            templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html'
          }
        }
      });
  })
  .controller('CategoriesListCtrl', function CategoriesCtrl(CategoriesModel) {
      var categoriesListCtrl = this;

      CategoriesModel.getCategories()
        .then(function(categories) {
          categoriesListCtrl.categories = categories;
        });
  });
