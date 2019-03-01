//create express file

const express = require('express');
const app = express()
app.use(express.json());


// from node-postgres.com/features/connecting
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
    const client = await pool.connect();
    console.log("hey", req, "hey hey");
    await client.query('INSERT INTO events(name,city,state,description) VALUES($1, $2, $3, $4) RETURNING *', [req.body.name, req.body.city, req.body.state, req.body.description]);

    await client.release();
    res.json([req.body])
})


// ###################################### PUT ######################################
app.put('/events/:id', async (req, res) => {
    // res.send("Put TEST from /events/")
    const client = await pool.connect();
    var oldEvent = client.query(function (eventsFunc) {
        return req.params.id == eventsFunc.id;
    });

    oldEvent.name = req.params.name;
    oldEvent.city = req.params.city;
    oldEvent.state = req.params.state;
    oldEvent.description = req.params.description;
    res.json(oldEvent);

    var found = await client.query('SELECT * FROM events WHERE id=$1', [
        req.params.id
    ]);
    await client.query('UPDATE events SET name = ($1),city = ($2),state = ($3),description = ($4) WHERE id = ($5)', [req.body.name, req.body.city, req.body.state, req.body.description, req.params.id]);


});

// ###################################### DELETE ######################################
app.delete('/events/:id', async (req, res) => {
    // res.send("DELETEEEEEEEEE TEST from /events/")
    const client = await pool.connect();
    const delEv = await client.query('DELETE FROM events WHERE id=($1)', [req.params.id]);
    await client.release();
    res.json(delEv.rows);
});
