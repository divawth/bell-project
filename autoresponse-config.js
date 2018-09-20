module.exports = {

    responseDir: './mock',

    post: true,

    get: {
        match: function (path) {
            var tokens = path.split('.');
            if (tokens.length > 1) {
                return false;
            }
            return !/^\/view|src|dep/.test(path);
        }
    },

};