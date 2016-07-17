import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import FolderItem         from '../folder-li/component';
import R                  from 'ramda';

const FolderList = FalcorComponent.extend({
  tagName: 'ul',

  folders: Ember.computed('foldersCollection.[]', function() {
    return R.filter(folder => !!folder,
      R.values(
        R.omit('length', this.get('foldersCollection'))
      )
    );
  }),
  cantPaginate: Ember.computed('folders.length', 'foldersCollection.length', function() {
    return this.get('folders.length') >= this.get('foldersCollection.length');
  }),

  actions: {
    paginate() {
      this.setQueryParams({folderCount: this.constructor.queryParams.folderCount + 1});
    }
  }
});

FolderList.reopenClass({
  queries: {
    folders: (params) => ['folderList', {from: 1, to: params.folderCount}, ...FolderItem.getQuery('folder')]
  },

  queryParams: {
    folderCount: 5
  }
})

export default FolderList;
