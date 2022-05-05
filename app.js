const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./api/models/db');

const routers = {
    index: require('./mvc/routes/index'),
    api: require('./api/routes/countries'),
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

app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use((req, res, next) => {
    res.$json = (status, data) => { res.status(status).json({...data, status}); }
    next();
})

app.use("/", routers.index);
app.use("/api", routers.api);
app.use("/countries", routers.countries);
app.use("*", (req, res, next) => { res.render("error", { title: "Error 404", message: "Page not found",  status:  404, }); });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
    // set locals, only providing error in development
    const { message, status } = error;
    res.status(status || 500);
    res.render('error', { title : "Error", message : message || "An unknown error occurred.", status: status || 500 });
});


module.exports = app;
