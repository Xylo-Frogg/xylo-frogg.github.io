import API from './api.js';

API.get('/', function(req){
  console.log('xxxxxxx');
});
API.get('/foo', function(req){
  console.log('foo', req);
});
