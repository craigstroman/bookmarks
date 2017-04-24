angular.module('bookmarksApp.models.categories', [

  ])
  .service('CategoriesModel', function($http, $q) {
    var model = this;
    var url = {
      fetch: 'data/categories.json'
    };
    var categories;
    var currentCategory;

    function extract(result) {
      return result.data;
    }

    /**
     * Cache's the categories so they don't have to be pulled from the remote data source again.
     *
     * @param  {Object} result The result object.
     * @return {Object}        All of the categories.
     */
    function cacheCategories(result) {
      categories = extract(result);

      return categories;
    }

    /**
     * Get's all the categories available.
     *
     * @return {Object} A promise object containing all of the categories.
     */
    model.getCategories = function() {
      return (categories) ? $q.when(categories) : $http.get(url.fetch).then(cacheCategories);
    };

    /**
     * Set's the current category to a new selected category.
     *
     * @param {String} category The new category selected.
     */
    model.setCurrentCategory = function(category) {
      return model.getCategoryByName(category).then(function(category) {
        currentCategory = category;
      });
    };

    /**
     * Get's the current category.
     *
     * @return {String} The current category name.
     */
    model.getCurrentCategory = function() {
      return currentCategory;
    };

    model.getCurrentCategoryName = function() {
      return currentCategory ? currentCategory.name : '';
    };

    /**
     * Get's a category by name.
     *
     * @param  {String} categoryName The category to find.
     * @return {Object}              A promise object containing the category.
     */
    model.getCategoryByName = function(categoryName) {
      var deferred = $q.defer();

      function findCategory() {
        return _.find(categories, function(c) {
          return c.name === categoryName;
        });
      }

      if (categories) {
        deferred.resolve(findCategory());
      } else {
        model.getCategories()
          .then(function() {
            deferred.resolve(findCategory());
          });
      }

      return deferred.promise;
    };
});
