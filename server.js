const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();

// Partials
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

// Middleware


app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.path} \n`;
	fs.appendFile('server.log', log, (err) => {
		if(err){
			console.log("Error Writing Log");
		}
	})
	console.log(log);
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: "Maintenance",
// 		pageDesc : "Site under Maintenance"
// 	});
// });

app.use(express.static(__dirname + "/public"));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req,res) => {
	// res.send({
	// 	"Name" : "Deepanshu Jain"
	// });
	res.render('home.hbs', {
		pageTitle: "Home",
		pageDesc : "Home Page"
	});
});


app.get('/about', (req,res) => {
	//res.send("About Page!!");
	res.render('about.hbs', {
		pageTitle: "About"
	});
});

app.get('/bad', (req,res) => {
	res.send({
		"errorMeesage" : "Error opening Page!!"
	});
});

app.listen(3002, () => {
	console.log("Web server started at Port 3002");
});