const gulp = require('gulp'),
    prettier = require('gulp-prettier'),
    webpack = require('webpack'),
    moment = require('moment')
const colors = require('colors')

const paths = {
    js: {
        all: ['./javascript/**/*.js', './*.js']
    }
}

gulp.task('format:js', () => {
    return gulp
        .src(paths.js.all)
        .pipe(prettier())
        .pipe(gulp.dest((file) => file.base))
})

gulp.task('format', gulp.series('format:js'))

gulp.task('webpack', async() =>
        webpack(require('./webpack.config'), (err, stats) => {
                if (err) console.log(err)
                console.log(
                        `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey(
        'Webpack'
      )}] Build '${colors.cyan(stats.hash)}' after ${colors.magenta(
        `${moment(stats.endTime).diff(moment(stats.startTime))}ms`
      )}`
    )
  })
)
gulp.task(
  'webpack:dev',
  async () => {
    // 开启一个 websocket 服务器
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8888 });
    wss.on('connection', function connection (ws) {
      ws.send('连上了');
      ws.on('message', function (message) {
        // 心跳反应
        ws.send(message.toString())
      });
    });
    wss.broadcast = function (data) {
      wss.clients.forEach(function (client) {
        client.send(data);
      });
    };
    webpack(require('./webpack.dev.config'), (err, stats) => {
      if (err) console.log(err);
      else wss.broadcast('reload');
      console.log(
        `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey(
          'Webpack'
        )}] Build '${colors.cyan(stats.hash)}' after ${colors.magenta(
          `${moment(stats.endTime).diff(moment(stats.startTime))}ms`
        )}`
      );
    })
  }
);

gulp.task('build', gulp.series('webpack', 'format'))

gulp.task('default', gulp.series(gulp.parallel('webpack:dev')))