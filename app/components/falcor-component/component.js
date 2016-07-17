import Ember              from 'ember';
import {modelListener}    from '../../models/falcor';

const FalcorComponent = Ember.Component.extend({
  setQueryParams(params) {
    Object.keys(params).forEach(paramName => {
      const paramValue = params[paramName];
      if (!this.constructor.queryParams[paramName]) {
        throw new Error(`queryParam ${paramName} does not exist on component ${this}.`);
      }
      this.constructor.queryParams[paramName] = paramValue;
    });

    modelListener.trigger('change');
  },

  getQuery(queryName) {
    return this.constructor.getQuery(queryName);
  }
});

FalcorComponent.reopenClass({
  getQuery(queryName) {
    const query = this.queries[queryName];

    // TODO - account for when queryParams are overwritten on the component instance
    const queryParams = this.queryParams;
    if (!query) {
      throw new Error(`query ${query} does not exist on component ${this}.`);
    }
    return query.call(this, queryParams);
  }
});

export default FalcorComponent
