import BookmarksModule from './bookmarks';
import BookmarksController from './bookmarks.controller';
import BookmarksComponent from './bookmarks.component';
import BookmarksTemplate from './bookmarks.html';

describe('Bookmarks', () => {
  let component, $componentController, BookmarksModel, CategoriesModel, $log;

  beforeEach(() => {
    window.module('bookmarks');

    window.module($provide => {
      $provide.value('BookmarksModel', {
        getBookmarks: () => {
          return {
            then: () => {}
          };
        }
      });
      $provide.value('CategoriesModel', {
        getCurrentCategory: () => {
          return null;
        }
      });
    });
  });

  beforeEach(inject((_$componentController_, _BookmarksModel_, _CategoriesModel_) => {
    BookmarksModel = _BookmarksModel_;
    CategoriesModel = _CategoriesModel_;
    $componentController = _$componentController_;
  }));

  describe('Module', () => {
    it('is named correctly', () => {
      expect(BookmarksModule.name).toEqual('bookmarks');
    });
  });

  describe('Controller', () => {
    it('calls BookmarksModel.getBookmarks immediately', () => {
      spyOn(BookmarksModel, 'getBookmarks').and.callThrough();

      component = $componentController('bookmarks', {
        BookmarksModel,
        CategoriesModel
      });
      component.$onInit();

      expect(BookmarksModel.getBookmarks).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('includes the bookmark-item class', () => {
      expect(BookmarksTemplate).toContain('bookmark-item');
    });

    it('includes the bookmark-edit class', () => {
      expect(BookmarksTemplate).toContain('bookmark-edit');
    });

    it('includes the bookmark-delete class', () => {
      expect(BookmarksTemplate).toContain('bookmark-delete');
    });
  });

  describe('Component', () => {
    const component = BookmarksComponent;

    it('includes the intended template', () => {
      expect(component.template).toEqual(BookmarksTemplate);
    });

    it('uses the correct `controllerAs` label', () => {
      expect(component.controllerAs).toBe('bookmarksListCtrl');
    });

    it('invokes the right controller', () => {
      expect(component.controller).toEqual(BookmarksController);
    });
  });
});
