var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//cors 노드 팩키지를 참조한다.
const cors = require('cors');

// .env 설정기능 참조 적용
require('dotenv').config();

// MVC(Model영역 모듈 참조) 시퀄라이즈 ORM 객체 참조하기
var sequelize = require('./models/index.js').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//사용자 정보 관리 라우팅 파일 참조
var memberRouter = require('./routes/member');

var app = express();

//노드 어플리케이션에 cors기능 적용 - 모든 리소스 접근 CORS 허용하기
app.use(cors());

// 시퀄라이즈 ORM객체를 이용해 지정한 MySQL 연결 동기화하기
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// member 라우터 파일 기본 URL주소 정의
app.use('/member', memberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
