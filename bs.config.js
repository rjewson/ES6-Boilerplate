module.exports = {
  files: [
    './dist/**/*.html',
    './dist/css/**/*.css',
    './dist/js/**/*.js',
    './dist/images/**/*',
    '!node_modules/**/*.html'
  ],
  server: {
    baseDir: 'dist'
  }
};
