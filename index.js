//Stock market app

const express = require('express');
const app = express();
const {engine} = require('express-handlebars'); 
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API KEY pk_1bf3a0e6df594bf5a1f30013fa312790
function call_api(finishedAPI, ticker) {
	request('https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/' + ticker + '?token=pk_1bf3a0e6df594bf5a1f30013fa312790', {json: true }, (err, res, body) => {
		if (err) {return console.log(err);}	
		if (res.statusCode === 200) {
		// console.log(body);
			finishedAPI(body);
	};

  });

};



//Set handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');

// const otherStuff = "This is the other stuff.."

//Set handlebar routes
app.get('/', (req, res) => {
	call_api(function(doneAPI) {
	    	res.render('home', {
    		stock: doneAPI[0]   	

    	});	
	}, "fb");
});

//Set handlebar index Post route

app.post('/', (req, res) => {
	call_api(function(doneAPI) {
			// posted_stuff = req.body.stock_ticker;
	    	res.render('home', {
    		stock: doneAPI[0]
    	});	
	}, req.body.stock_ticker);
});

app.get('/about.html', (req, res) => {
    res.render('about');
});



// Set static route

app.use(express.static(path.join(__dirname, 'Public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));