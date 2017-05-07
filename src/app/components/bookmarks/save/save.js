import angular from 'angular';
import SaveBookmarkComponent from './save.component';

const SaveBookmarkModule = angular.module('saveBookmark', [])
  .component('saveBookmark', SaveBookmarkComponent);

export default SaveBookmarkModule;
