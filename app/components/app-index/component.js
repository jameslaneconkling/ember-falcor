import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import FolderList         from '../folder-list/component';
import falcor,
       {modelListener}    from '../../models/falcor';

const AppIndex = FalcorComponent.extend({
  _init: Ember.on('init', function() {
    this.hydrate();
    modelListener.on('change', () => this.hydrate());
  }),

  hydrate() {
    console.log(JSON.stringify(this.getQuery('folders')));

    falcor.get(...this.getQuery('folders'))
      .subscribe(res => {
        this.set('graph', res.json);
      }, err => {
        Ember.Logger.warn(err);
      });
  }
});

AppIndex.reopenClass({
  queries: {
    folders: () => [
      FolderList.getQuery('folders'),
      ['folderList', 'length']
    ]
  }
});

export default AppIndex;
