(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['falcor'] };
  }

  define('falcor', [], vendorModule);
})();
