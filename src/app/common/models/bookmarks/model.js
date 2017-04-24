angular.module('bookmarksApp.models.bookmarks', [

])
  .service('BookmarksModel', function($http, $q) {
    var model = this;
    var url = {
      fetch: 'data/bookmarks.json'
    };
    var bookmarks = null;

    /**
     * Get's the result from the promise.
     *
     * @param  {Object} result The result object of the promise.
     * @return {Array}        The array containing the data.
     */
    function extract(result) {
      return result.data;
    }

    /**
     * Extracts the result from the promise returned.
     *
     * @param  {Object} result The result object of the promise.
     * @return {Array}        The array containing the data.
     */
    function cacheBookmarks(result) {
      bookmarks = extract(result);

      return bookmarks;
    }

    function findBookmark(bookmarkId) {
          return _.find(bookmarks, function (bookmark) {
              return bookmark.id === parseInt(bookmarkId, 10);
          })
      }

    /**
     * Get's the bookmarks from the data source.
     *
     * @return {Object} A promise that contains the results.
     */
    model.getBookmarks = function() {
      return (bookmarks) ? $q.when(bookmarks) : $http.get(url.fetch).then(cacheBookmarks);
    };

  model.getBookmarkById = function (bookmarkId) {
        var deferred = $q.defer();
        if (bookmarks) {
            deferred.resolve(findBookmark(bookmarkId))
        } else {
            model.getBookmarks().then(function () {
                deferred.resolve(findBookmark(bookmarkId))
            })
        }
        return deferred.promise;
    };

    /**
     * Creates a new bookmark.
     *
     * @param  {Object} bookmark The new bookmark object that contains the url, and title.
     */
    model.createBookmark = function(bookmark) {
      bookmark.id = bookmarks.length;
      bookmarks.push(bookmark);
    };

    /**
     * Updates a bookmark.
     *
     * @param  {Object} bookmark The current bookmark id, title, and url.
     */
    model.updateBookmark = function (bookmark) {
        var index = _.findIndex(bookmarks, function (b) {
            return b.id == bookmark.id
        });

        bookmarks[index] = bookmark;
    };

    /**
     * Deletes a selected bookmark.
     *
     * @param  {Object} bookmark The bookmark id, title, and url to be deleted.
     */
    model.deleteBookmark = function(bookmark) {
      _.remove(bookmarks, function(b) {
        return b.id === bookmark.id;
      });
    };
  });
