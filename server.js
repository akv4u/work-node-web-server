const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

var app = express ();

// regist partial direcoty
hbs.registerPartials(__dirname + '/views/partials')

// tell express who is view engine
app.set('view engine', 'hbs');

hbs.registerHelper ('getCurrentYear', () => {
  return  'test';//new Date().getFullYear();
});

hbs.registerHelper ('ScreemIt', (text) => {
  return text.toUpperCase();
});


// register middleware, you can write log etc before serving it
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log (log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log ('Unable to append to server log');
    }
  });


  next(); // this call is required to let rest of stuff work
});

// app.use ((req, res, next) => {
//   res.render('maintenance.hbs');
// });

/* register a directory to be publicly served */
app.use(express.static(__dirname + '/public'));

/* serving root */
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!</h1>');
  // res.send({
  //   name:"amit",
  //   likes: [
  //     'photography',
  //     'art',
  //     'colours'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle:"Home page",
    welcomeMessage:"Clear Application. Welcome!!"
  });
});

/* serving about */
app.get('/about', (req, res) => {
   res.render('about.hbs', {
     pageTitle:"About page",
   });
});
/* serving bad response */
app.get('/bad', (req, res) => {
  res.send ({
    error:400,
    msg:"Not found"
  });
});
app.listen (8989, () => {
  console.log ('Server is up on port 8989');
});
