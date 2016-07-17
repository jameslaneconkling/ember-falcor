import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import FolderItem         from '../folder-li/component';

const FolderList = FalcorComponent.extend({
  tagName: 'ul'
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
