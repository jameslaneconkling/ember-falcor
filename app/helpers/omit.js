import Ember from 'ember';
import R     from 'ramda';

export function omit(params) {
  return R.omit(params.slice(1), params[0]);
}

export default Ember.Helper.helper(omit);
