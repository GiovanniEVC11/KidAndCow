// Grab our dependecies jcvr682020
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');

const {PORT, mongoUri} = require('./config');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const apiRoute_pd = require('./routes/api/productionData');

//Cloud
/*
const path = require('path');
*/

// Cors 
// It will allow us to make AJAX request from our front-ent dev server to the backend
app.use(cors());

// Morgan
// We log every request to the server in the console and we're usign the tiny configuration that give us small messages
app.use(morgan('tiny'));

//It will transfer the body of every request to JSON
app.use(bodyParser.json()) ;

// Connection to Cluster MongoDB Atlas 
mongoose
    .connect(mongoUri,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
            useFindAndModify: false
}).then(() => console.log('MongoDB database Connected ...'))
.catch((err) => console.log(err) );

app.use('/api/produccion', apiRoute_pd);

// Message to probe server 
app.get('/', (req, res) => res.send('Message to verify Server'));
app.listen(PORT, () => console.log( ` App listening PORT: ${PORT}`) );

// TO CLOUD 
/*
if(process.env.NODE_ENV = ''){
    app.use(Express.static('client/dist')) // Thi it will create for itself
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
*/