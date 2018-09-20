
let engine = require('./engine')

module.exports = function (path, query, post, context) {
    return {
        _timeout: 0,
        _status: 200,
        _header: {
          'content-type': 'text/html',
        },
        _data: engine.render(context, 'index')
    };
};
