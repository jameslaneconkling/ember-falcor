import Ember              from 'ember';
import falcor,
       {modelListener}    from '../models/falcor';

export default Ember.Controller.extend({
  newWorkspaceName: null,
  disableCreateNewWorkspace: Ember.computed.not('newWorkspaceName.length'),

  _init: Ember.on('init', function() {
    modelListener.on('change', () => {
      this.refreshModel();
    });
  }),

  refreshModel() {
    falcor.get(
      ['recentWorkspaces', 'length'],
      ['recentWorkspaces', {to: 10}, ['url', 'label', 'modified', 'bookmarks']],
      ['recentWorkspaces', {to: 10}, 'subfolders', 'length'],
      ['recentWorkspaces', {to: 10}, 'savedSearch', 'length']
    )
      .subscribe(res => {
        this.set('model', res.json);
      }, err => {
        falcor.invalidate(['recentWorkspaces']);
        Ember.Logger.warn(err);
        reject(err);
      });
  },

  actions: {
    submitWorkspace() {
      const callPath = ['recentWorkspaces', 'add'];
      const args = [this.get('newWorkspaceName')];
      const refSuffixes = [
        [['url', 'label', 'modified']],
        ['subfolders', 'length']
      ];
      const thisPaths = ['length'];

      falcor.call(callPath, args, refSuffixes, thisPaths)
        .subscribe(() => {
          this.set('newWorkspaceName', null);
        }, err => Ember.Logger.error('error creating new workspace'));
    }
  }
});
