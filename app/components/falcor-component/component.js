import Ember from 'ember';

export default Ember.Component.extend({
  paths: [],
  childPathSuffix: {},
  childComponents: [],
  getQueryPath() {
    const childComponents = typeof this.get('childComponents') === 'function' ? this.get('childComponents').call(this) : this.get('childComponents');
    const childViewsPaths = childComponents.reduce((childPaths, childName) => {
      const component = Ember.getOwner(this).lookup(`component:${childName}`);

      if (typeof component.getQueryPath === 'function') {
        const pathsSuffix = this.get('childPathSuffix')[childName] || [];
        const componentPaths = component.getQueryPath().map(path => [...pathsSuffix, ...path]);
        return childPaths.concat(componentPaths);
      }
      return childPaths;
    }, []);

    return [
      ...this.get('paths'),
      ...childViewsPaths
    ];
  }
});
