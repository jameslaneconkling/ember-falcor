import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import falcor             from '../../models/falcor';

export default FalcorComponent.extend({
  newWorkspaceName: null,
  disableCreateNewWorkspace: Ember.computed.not('newWorkspaceName.length'),

  actions: {
    submitWorkspace() {
      const callPath = ['recentWorkspaces', 'add'];
      const args = [this.get('newWorkspaceName')];
      const refSuffixes = [];
      const thisPaths = ['length'];

      falcor.call(callPath, args, refSuffixes, thisPaths)
        .subscribe(() => {
          this.set('newWorkspaceName', null);
        }, err => Ember.Logger.error('error creating new workspace', err));
    }
  }
});
