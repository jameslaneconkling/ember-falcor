import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import falcor,
       {url2Path}         from '../../models/falcor';

const FolderItem = FalcorComponent.extend({
  tagName: 'li',
  actions: {
    deleteFolder() {
      let callPath = ['foldersById', this.get('folder.id'), 'delete'];
      let args = [];
      let refSuffixes = [];
      let thisPaths = [];

      falcor.call(callPath, args, refSuffixes, thisPaths)
        .subscribe(() => {}, err => {
          Ember.Logger.error('Error deleting Folder', err);
        });
    }
  }
});

FolderItem.reopenClass({
  queries: {
    folder: () => [['id', 'name']]
  }
});

export default FolderItem;
