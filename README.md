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
     
      // with destructuring: 
      var [body, header] = yield coNano.use('myDb').insert({hello: 'world'});
      
      // without destructuring:
      var res = yield coNano.use('myDb').insert({hello: 'world'});
      var body = res[0];
    })();
