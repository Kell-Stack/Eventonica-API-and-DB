//create express file

const express = require('express');
const app = express()
app.use(express.json());


// from node-postgress.com
const {
    Pool
} = require('pg')
var pool = new Pool({
    host: 'localhost',
    database: 'eventonica'
})


//run node index.js and you should be connected to server (POSTMAN)
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is actually in port ${PORT}`))

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ create your routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ###################################### GET ######################################
app.get('/', async (req, res) => {
    res.send("Hey Kelly Girl. You made an API")
});

// show all events
app.get('/events/', async (req, res) => {
    // res.send("WELCOME from /events/ " + req.params.id);
    const client = await pool.connect();
    var events = await client.query('SELECT * FROM events');
    client.release()
    res.json(events.rows); //from the table events events.rows
});

//show data from one event
app.get('/events/:id', async (req, res) => {
    // res.send("Here is the information about /events/ " + req.params.id);
    const client = await pool.connect();
    var found = await client.query('SELECT * FROM events WHERE id=$1', [
        req.params.id
    ]);
    res.json(found.rows[0]);
    client.release();
}); 
        
// if (found) res.json(found);
// else res.status(404).send("SORRY (i aint sorry)ID NOT FOUND");


// ###################################### POST ######################################

app.post('/events', async (req, res) => {
const client = await pool.connect();('INSERT INTO events (name,city,state,description) VALUES($1) RETURNING *',[req.body.name]);
await client.release();
res.json(newEvents.row[0])
})


// ###################################### PUT ######################################
app.put('/events/:id', async (req, res) => {
    // res.send("Put TEST from /events/")
    var oldEvent = data.find(function (eventsFunc) {
        return req.params.id == eventsFunc.id;
    });
    oldEvent.name = req.body.name;
    oldEvent.city = req.body.city;
    oldEvent.state = req.body.state;
    oldEvent.description = req.body.description;
    res.json(data);
});

// ###################################### PUT ######################################
app.delete('/events/:id', async (req, res) => {
    // res.send("DELETEEEEEEEEE TEST from /events/")
    let oldEvent = data.find(function (event) {
        return req.params.id === event.id
    });
    var locateIDtoDel = data.indexOf(oldEvent)
    data.splice(locateIDtoDel, 1)
    res.json(data);

});