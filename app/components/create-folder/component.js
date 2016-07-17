import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import falcor             from '../../models/falcor';

export default FalcorComponent.extend({
  newFolderName: null,
  disableCreateNewFolder: Ember.computed.not('newFolderName.length'),

  actions: {
    createFolder() {
      const callPath = ['folderList', 'add'];
      const args = [this.get('newFolderName')];
      const refSuffixes = [];
      const thisPaths = ['length'];

      falcor.call(callPath, args, refSuffixes, thisPaths)
        .subscribe(() => {
          this.set('newFolderName', null);
        }, err => Ember.Logger.error('error creating new folder', err));
    }
  }
});
