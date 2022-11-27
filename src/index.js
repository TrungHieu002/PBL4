const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
// const middleware = require('./app/Middlewares/SortMiddlewares')
const app = express()
const port = 3000 
const route = require('./routes')
const db = require('./config/db')
db.connect();
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));    
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(middleware)
app.use(methodOverride('_method'))
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
    })

);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})