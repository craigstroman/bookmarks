angular.module('categories.bookmarks', [
  'categories.bookmarks.create',
  'categories.bookmarks.edit',
  'bookmarksApp.models.categories',
  'bookmarksApp.models.bookmarks'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('bookmarksApp.categories.bookmarks', {
        url: 'categories/:category',
        views: {
          'bookmarks@': {
            templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
            controller: 'BookmarksListCtrl as bookmarksListCtrl'
          }
        }
      });
  })
  .controller('BookmarksListCtrl', function($stateParams, CategoriesModel, BookmarksModel) {
    var bookmarksListCtrl = this;

    CategoriesModel.setCurrentCategory($stateParams.category);

    BookmarksModel.getBookmarks()
      .then(function(bookmarks) {
        bookmarksListCtrl.bookmarks = bookmarks;
      });

      bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
      bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
      bookmarksListCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
  });
