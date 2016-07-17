import Ember  from 'ember';
import falcor from 'falcor';

const listener = Ember.Object.extend(Ember.Evented).create();

const model = new falcor.Model({
  source: new falcor.HttpDataSource('http://localhost:3000/api/model.json'),
  onChange: function() {
    console.log('onChange');
    listener.trigger('change');
  }
});

export default model;

export const modelListener = listener;

export function url2Path(url) {
  let documentPath = url.split(/\/api\//);

  if (documentPath.length > 1) {
    return documentPath[documentPath.length - 1]
      .split('/')
      .filter(path => path !== '');
  }

  Ember.Logger.error('Error trying to parse path from url:', url);

  return null;
}
