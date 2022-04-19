const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./api/models/db');

const routers = {
    index: require('./mvc/routes/index'),
    api: require('./api/routes/index'),
    countries: require('./mvc/routes/countries')
}

const app = express();

app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'mvc', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.$json = (status, data) => { res.status(status).json({...data, status}); }
    next();
})

app.use('/', routers.index);
app.use('/api', routers.api);
app.use('/countries', routers.countries);

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
