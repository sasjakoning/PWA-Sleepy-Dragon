import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import router from './router/router.js';
import cookieParser from 'cookie-parser';

const __dirname = path.resolve();
const port = process.env.PORT || 3000;

const app = express(); 

app.set('view engine', 'hbs');  
app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(process.env.PORT || port, () => {
  console.log('Example app listening on port 3000!');
});

app.engine('hbs',
handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: [
      path.join(__dirname, 'views', 'partials'),
      path.join(__dirname, 'views', 'partials', 'loading')
    ]
}));

app.use('/', router);
