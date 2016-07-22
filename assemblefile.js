var path = require('path');
var merge = require('mixin-deep');
var engines = require('consolidate');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var viewEvents = require('./plugins/view-events');
var permalinks = require('assemble-permalinks');
var assemble = require('assemble');
var app = assemble();

// plugins
app.use(viewEvents('permalink'));
app.use(permalinks());

app.onPermalink(/./, function(file, next) {
  file.data = merge({}, app.cache.data, file.data);
  next();
});

// site's data
app.data('./src/data/*.json');

// pages collection
app.create('pages');
app.pages.use(permalinks(':site.base/:filename.html'));

// set jade engine
app.engine('jade', engines.jade, {filename: 'default'})

// helpers
app.helpers('./helpers/**/*.js');

// tasks
app.task('load', function (cb) {
  app.partials('./src/templates/partials/*.jade')
  app.layouts('./src/templates/layouts/*.jade')
  app.pages('./src/templates/pages/*.jade')
  cb();
})

app.task('default', ['load'], function () {
  return app.toStream('pages')
    .on('error', console.log)
    .pipe(app.renderFile())
    .pipe(app.dest(function(file) {
      file.path = file.data.permalink;
      file.base = path.dirname(file.path);
      return file.base;
    }));
})

app.task('iconfont', function (){
  return app.src('./src/icons/**/*.svg', { base: 'src' })
    .pipe(iconfontCss({
      fontName: 'icons',
      path: './src/css/utils/icons-template.css',
      targetPath: '../../src/css/elements/icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: 'icons',
      prependUnicode: false,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      timestamp: Math.round(Date.now()/1000),
      log: function(){}
    }))
    .pipe(app.dest('./dist/fonts'));
})

module.exports = app;
