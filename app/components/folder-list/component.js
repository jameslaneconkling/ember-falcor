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

  queries: {
    folders(params) {
      return this.getQuery(FolderItem, 'folder').map(query => {
        return ['folderList', {from: 1, to: params.folderCount}, ...query];
      });
    }
  },

  queryParams: {
    folderCount: 2
  },

  actions: {
    paginate() {
      this.setQueryParams({folderCount: this.queryParams.folderCount + 1});
    }
  }
});

export default FolderList;
