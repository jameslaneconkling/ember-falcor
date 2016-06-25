import Ember  from 'ember';
import falcor from 'falcor';

const listener = Ember.Object.extend(Ember.Evented).create();

const model = new falcor.Model({
  source: new falcor.HttpDataSource('/api/model.json'),
  onChange: function() {
    listener.trigger('change');
  }
});

export default model;

export const modelListener = listener;
