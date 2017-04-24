angular.module('categories.bookmarks.create', [

])
  .config(function($stateProvider) {
    $stateProvider
      .state('bookmarksApp.categories.bookmarks.create', {
        templateUrl: 'app/categories/bookmarks/create/create.tmpl.html',
        controller: 'CreateBookMarkCtrl as createBookmarkCtrl'
      });
  })
  .controller('CreateBookMarkCtrl', function($state, $stateParams, BookmarksModel) {
    var createBookmarkCtrl = this;

    /**
     * Brings the user back to the bookmarks view.
     */
    function returnToBookmarks() {
      $state.go('bookmarksApp.categories.bookmarks', {
        category: $stateParams.category
      });
    }

    /**
     * Creates a new bookmark.
     */
    function createBookmark() {
      createBookmarkCtrl.newBookmark.category = $stateParams.category;

      BookmarksModel.createBookmark(createBookmarkCtrl.newBookmark);

      returnToBookmarks();
    }

    /**
     * Allows the user to cancel creating a bookmark.
     */
    function cancelCreating() {
      returnToBookmarks();
    }

    /**
     * Resets the create form.
     */
    function resetForm() {
      createBookmarkCtrl.newBookmark = {
        title: '',
        url: '',
        category: $stateParams.category
      };
    }

    createBookmarkCtrl.cancelCreating = cancelCreating;
    createBookmarkCtrl.createBookmark = createBookmark;

    resetForm();
  });
