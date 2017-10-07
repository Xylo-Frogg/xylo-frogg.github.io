import Navigo from 'navigo';

require('../scss/main.scss');

var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on('/', function(){
    console.log('/index')
  })
  .resolve();

router
  .on('/foo', function(){
    console.log('/foo')
  })
  .resolve();

  router
    .on('/foo/:bar', function(params){
      console.log('/:bar', params);
    })
    .resolve();
