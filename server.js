const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';

var fs = require('fs');
var _ = require('lodash');
var nodemailer = require('nodemailer');

var app = express();
var router = express.Router();
var viewPath = __dirname + '/views/';
var dataPath = __dirname + '/data/';

app.use(express.static('public'))

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/',function(req,res){
  res.sendFile(viewPath + 'index.html');
});

router.get('/about',function(req,res){
  res.sendFile(viewPath + 'about.html');
});

router.get('/clients',function(req,res){
  res.sendFile(viewPath + 'clients.html');
});

router.get('/partners',function(req,res){
  res.sendFile(viewPath + 'partners.html');
});

router.get('/products',function(req,res){
  res.sendFile(viewPath + 'products.html');
});

router.get('/resources',function(req,res){
  res.sendFile(viewPath + 'resources.html');
});

router.get('/solutions',function(req,res){
  res.sendFile(viewPath + 'solutions.html');
});

router.get('/contact',function(req,res){
  res.sendFile(viewPath + 'contact.html');
});

router.get('/dataset',function(req,res){
  res.sendFile(viewPath + 'assets/dataset.xlsx');
});


router.get('/api/products/:id?', function(req, res){
	fs.readFile(dataPath + 'products.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
		var obj = JSON.parse(data);
		
		if(req.params.id) {
			res.json(_.filter(obj, function(element) {
				return element.id === req.params.id;
			})); 
		} else {
			res.json(obj);
		}
	});
});

app.use('/',router);

app.use('*',function(req,res){
  res.sendFile(viewPath + '404.html');
});

app.listen(PORT,function(){
  console.log('Live at Port '+PORT);
});
