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
    const query = this.queries.folders.call(this);
    console.log(JSON.stringify(query));
    falcor.get(...query)
      .subscribe(res => {
        this.set('graph', res.json);
      }, err => {
        Ember.Logger.warn(err);
      });
  },

  queries: {
    folders() {
      return [
        ...this.getQuery(FolderList, 'folders')[0],
        ['folderList', 'length']
      ];
    }
  }
});

export default AppIndex;
