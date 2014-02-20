var thunkify = require('thunkify');

var thunker = function thunker(methods, object) {
  var thunked = {};
  methods.forEach(function(method) {
    switch (typeof method) {
      case 'string':
        thunked[method] = thunkify(object[method]);
        break;
      case 'object':
        thunked[method.name] = thunker(method.methods, object[method.name]);
        break;
    }
  });
  return thunked;
};

var methods = [
  'create',
  'get',
  'destroy',
  'list',
  'compact',
  'replicate',
  'changes',
  'follow'
];

var db_methods = [
  'insert',
  'destroy',
  'get',
  'head',
  'copy',
  'bulk',
  'list',
  'fetch',
  'view',
  'show',
  'atomic',
  'search',
  {
    name: 'attachment',
    methods: ['insert', 'get', 'destroy']
  },
  {
    name: 'multipart',
    methods: ['insert', 'get']
  }
];

module.exports = function(nano) {
  thunkedNano = {
    db: thunker(methods, nano.db),
    use: function(db_name) { return thunker(db_methods, nano.use(db_name)) },
    request: thunkify(nano.request),
    auth: thunkify(nano.auth),
    session: nano.session,
    config: nano.config
  };

  thunkedNano.db.use = thunkedNano.use;
  
  return thunkedNano;
};
