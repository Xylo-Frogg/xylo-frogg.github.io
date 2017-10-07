import page from 'page';

require('../scss/main.scss');

page('/', function(){
  console.log('index');
});

page('/foo', function(){
  console.log('foo');
});

page('/foo/:bar', function(context){
  console.log(':bar', context);
});

page();
