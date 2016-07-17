import Ember              from 'ember';
import {modelListener}    from '../../models/falcor';

const FalcorComponent = Ember.Component.extend({
  setQueryParams(params) {
    Object.keys(params).forEach(paramName => {
      const paramValue = params[paramName];
      if (!this.queryParams[paramName]) {
        throw new Error(`queryParam ${paramName} does not exist on component ${this}.`);
      }
      this.queryParams[paramName] = paramValue;
    });

    modelListener.trigger('change');
  },

  /**
   * generates an array of query fragments
   */
  getQuery(componentClass, queryName) {
    const childComponents = this.childViews.filter(view => view instanceof componentClass);
    if (childComponents.length === 0) {
      // possible to do this w/o instantiating?
      childComponents.push(componentClass.create());
    }

    return childComponents
      .filter(component => component.get(`queries.${queryName}`))
      .map(component => {
        const query = component.get(`queries.${queryName}`);
        const queryParams = component.get('queryParams');
        return query.call(component, queryParams);
      });
  }
});

FalcorComponent.reopenClass({});

export default FalcorComponent
