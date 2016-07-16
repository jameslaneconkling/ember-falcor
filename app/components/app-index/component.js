import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';
import falcor,
       {modelListener}    from '../../models/falcor';

export default FalcorComponent.extend({
  paths: [['recentWorkspaces', 'length']],
  childComponents: ['workspace-list'],

  _init: Ember.on('init', function() {
    this.hydrate(() => {
      modelListener.on('change', () => {
        this.hydrate();
      });
    });

  }),

  hydrate(done = () => {}) {
    console.log(JSON.stringify(this.getQueryPath()));

    falcor.get(...this.getQueryPath())
      .subscribe(res => {
        this.set('model', res.json);
        done();
      }, err => {
        Ember.Logger.warn(err);
        done();
      });
  }
});
