angular.module('Bookmarks', [
  'ui.router',
  'categories',
  'categories.bookmarks'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('bookmarksApp', {
        url: '',
        abstract: true
      });

      $urlRouterProvider.otherwise('/');
  });
