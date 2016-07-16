import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import falcor,
       {url2Path}         from '../../models/falcor';

export default FalcorComponent.extend({
  paths: [[['url', 'label', 'modified']]],

  actions: {
    deleteWorkspace() {
      let resourcePath = url2Path(this.get('model.url'));
      let callPath = [...resourcePath, 'delete'];
      let args = [];
      let refSuffixes = [];
      let thisPaths = [];

      falcor.call(callPath, args, refSuffixes, thisPaths)
        .subscribe(() => {}, err => {
          Ember.Logger.error('Error deleting Workspace', err);
        });
    }
  }
});
