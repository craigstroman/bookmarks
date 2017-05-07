import angular from 'angular';
import BookmarksModel from './models/bookmarks/bookmarks';
import CategoriesModel from './models/categories/categories';

const CommonModule = angular.module('common', [])
  .service('BookmarksModel', BookmarksModel)
  .service('CategoriesModel', CategoriesModel);

export default CommonModule;
