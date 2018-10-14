const mongoose = require('mongoose');
const express = require('express');

const booksRouter = require('./routes/booksRoute');

// connect to database
mongoose.connect('mongodb://localhost/library')
    .then(()=>{
        console.log('DB connected..');
    })
    .catch((err)=> console.log(err.message));

// set express alias
app = express();

// midlewares
app.use('/api/books',booksRouter );
app.use(express.json());

app.use('/',express.static(__dirname)); // to get files from the root [ http://locahost:3000/ ]
app.use('/fonts', express.static(__dirname + '/fonts'));  // to get any font file from [ localhost:3000/fonts ]
app.use('/css', express.static(__dirname + '/css')); // to get any css file from [ localhost:3000/css ]
app.use('/js', express.static(__dirname + '/js')); // to get any javascript file from [ localhost:3000/js ]

app.get('/', (req,res) =>{
    res.sendFile(__dirname+'/index.html');
});

app.listen(3000);