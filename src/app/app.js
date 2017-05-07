import angular from 'angular';
import appComponent from './app.component';
import CommonModule from './common/index';
import ComponentsModule from './components/index';

angular.module('app', [
  CommonModule.name,
  ComponentsModule.name,
])
  .component('app', appComponent);
