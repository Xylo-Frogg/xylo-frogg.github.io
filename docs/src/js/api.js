import pathToRegexp from 'path-to-regexp';
import _ from 'underscore';

var API = {
  get: function(path, callback){
    var keys = []
    let re = pathToRegexp(path, keys),
        match = re.exec(window.location.pathname);

    if (!match) {
      return;
    }

    if (_.isFunction(callback)) {
      callback.call(this, match);
    }

  }
}





module.exports = API;
