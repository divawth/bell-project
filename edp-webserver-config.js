
var path = require('path');

var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

var autoprefixInstance = autoprefixer({
    browsers: [
        '> 0%',
        'last 10 version'
    ]
});


exports.port = 10013;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

exports.getLocations = function () {
    return [
        {
            location: /\/$/,
            handler: home( 'index.html' )
        },
        {
            location: /^\/login/,
            handler: home( 'auth/login.html' )
        },
        {
            location: /\.php($|\?)/,
            handler: [
                php('php-cgi')
            ]
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    paths: [
                        __dirname,
                        path.join(__dirname, 'src'),
                    ],
                    'resolve url': true
                }),
                function (context) {
                    var docRoot  = context.conf.documentRoot;
                    var pathname = context.request.pathname;
                    context.stop();
                    postcss([ autoprefixInstance ])
                    .process(context.content)
                    .then(function (result) {
                        context.content = result.css;
                        context.start();
                    });
                }
            ]
        },
        require('autoresponse')(
            'edp',
            {
                watch: true,
                logLevel: 'info'
            }
        ),
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
