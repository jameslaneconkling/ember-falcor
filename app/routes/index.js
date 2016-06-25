import Ember     from 'ember';
import falcor    from '../models/falcor';

export default Ember.Route.extend({
  model() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      falcor.get(
        ['recentWorkspaces', 'length'],
        ['recentWorkspaces', {to: 10}, ['url', 'label', 'modified', 'bookmarks']],
        ['recentWorkspaces', {to: 10}, 'subfolders', 'length'],
        ['recentWorkspaces', {to: 10}, 'savedSearch', 'length']
      )
        .subscribe(res => {
          resolve(res.json);
        }, err => {
          falcor.invalidate(['recentWorkspaces']);
          Ember.Logger.warn(err);
          reject(err);
        });
    });
  }
});
