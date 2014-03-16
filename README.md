co-nano
=======

Exposes couchdb [nano](github.com/dscape/nano) library API as thunks for use with [co](github.com/visionmedia/co) and [koa](github.com/koajs/koa).

Install with `npm install co-nano`

nano methods return `(err, body, header)`, meaning the co-nano wrappers will throw `err`, and yield `[body, header]`.

Usage: (Destructuring syntax not yet in V8 / node)

    var co = require('co');
    var nano = require('nano')('http://localhost:5984');
    var coNano = require('co-nano')(nano);
  
    co(function *() { // Or inside a koa handler
      yield coNano.db.create('myDb');
    
      var db = coNano.use('myDb'); 
      // with destructuring: 
      var [body, headers] = yield db.insert({hello: 'world'}, 'myDocument');
      
      // without destructuring:
      var res = yield db.insert({hello: 'world'}, 'myDocument');
      var body = res[0], headers = res[1];
    })();
