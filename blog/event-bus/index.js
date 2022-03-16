const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];


app.post('/events', async(req,res) => {
    const event = req.body;

    events.push(event);

    //Posts Service
    await axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
      });;
    //Comments Service
    await axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
      });;
    //Query Service
    await axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
      });;
    //Moderation Service
    await axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
      });;

    res.send({status : 'OK'})
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log("listening on 4005")
});