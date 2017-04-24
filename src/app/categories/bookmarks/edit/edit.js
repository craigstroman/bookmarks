angular.module('categories.bookmarks.edit', [

])
  .config(function($stateProvider) {
    $stateProvider
      .state('bookmarksApp.categories.bookmarks.edit', {
        url: '/bokmarks/:bookmarkId/edit',
        templateUrl: 'app/categories/bookmarks/edit/edit.tmpl.html',
        controller: 'EditBookmarkCtrl as editBookmarkCtrl'
      });
  })
  .controller('EditBookmarkCtrl', function($state, $stateParams, BookmarksModel) {
    var editBookmarkCtrl = this;

    /**
     * Brings a user back to the selected bookmarks view.
     */
    function returnToBookmarks() {
      $state.go('bookmarksApp.categories.bookmarks', {
        category: $stateParams.category
      });
    }
    /**
     * Updates the selected bookmark.
     */
    function updateBookmark() {
      editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
      BookmarksModel.updateBookmark(editBookmarkCtrl.editedBookmark);

      returnToBookmarks();
    }

    /**
     * Allows a user to cancel editing a bookmark.
     */
    function cancelEditing() {
      returnToBookmarks();
    }

    BookmarksModel.getBookmarkById($stateParams.bookmarkId)
      .then(function(bookmark) {
        if (bookmark) {
          editBookmarkCtrl.bookmark = bookmark;
          editBookmarkCtrl.editedBookmark = angular.copy(editBookmarkCtrl.bookmark);
        } else {
          returnToBookmarks();
        }
      });

      editBookmarkCtrl.cancelEditing = cancelEditing;
      editBookmarkCtrl.updateBookmark = updateBookmark;
  });
