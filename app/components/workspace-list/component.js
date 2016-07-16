import Ember              from 'ember';
import FalcorComponent    from '../falcor-component/component';

export default FalcorComponent.extend({
  paths: [['recentWorkspaces', 'length']],
  childPathSuffix: { // or overwrite getQueryPath
    'workspace-li': ['recentWorkspaces', {to: 10}]
  },
  childComponents: ['workspace-li']
});
