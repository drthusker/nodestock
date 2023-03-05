const express = require('express');
const app = express();
const {engine} = require('express-handlebars'); 
const path = require('path');

const PORT = process.env.PORT || 5000;

//Set handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = 'this is about other stuff....';

//Set handlebar routes
app.get('/', (req, res) => {
    res.render('home', {
    	stuff: otherstuff
    });
});




// Set static route

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));