const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());                          // allowing cors
app.use(bodyParser.json());

let truckData = require('./data.json');   // loading initial truckData from data.json
let deletedTrucks = [];                   // Storing the deleted truck object array so it can be shown again when data in json is empty

app.get('/api/trucks', (req, res) => {    // api to GET the data from json when server is started
  if (truckData.length === 0) {           // If all the data is deleted, it restores the data using deletedTrucks json array, when page is refreshed.
    truckData = [...deletedTrucks];
    deletedTrucks = [];
    console.log('Data restored on refresh')
  }
  res.json(truckData);                    // sending the truckData as json response
});

app.put('/api/trucks/:registration', (req, res) => {      // handling PUT request when 5 min are added in departure time
  const { registration } = req.params;
  const { departureDateTime } = req.body;

  const truckIndex = truckData.findIndex((truck) => truck.registration === registration);
  if (truckIndex !== -1) {
    truckData[truckIndex].departureDateTime = departureDateTime;
    console.log('PUT request received - added 5 min in departure time')
    res.json();
  } else {
    res.status(404).json({ error: 'Truck data not found' });
  }
});

app.delete('/api/trucks/:registration', (req, res) => {               // handling DELETE request when data is deleted
  const { registration } = req.params;

  const truckIndex = truckData.findIndex((truck) => truck.registration === registration);
  if (truckIndex !== -1) {
    const deletedTruck = truckData.splice(truckIndex, 1)[0];
    deletedTrucks.push(deletedTruck);                                 //Pushing deleted data in deletedTrucks array so data can be restored when page is refreshed
    console.log('DELETE request received - Truck data deleted');
    res.json();
  } else {
    res.status(404).json({ error: 'Truck data not found' });
  }
});

app.post('/api/trucks', (req, res) => {                             // handling POST request when new data is added.
  const { registration, arrivalDateTime, departureDateTime, bay } = req.body;

  const newTruck = {
    registration: registration,
    arrivalDateTime: arrivalDateTime,
    departureDateTime: departureDateTime,
    bay: bay,
  };
  truckData.push(newTruck);
  console.log('POST request received - New truck data added');
  res.json();
});

app.listen(5000, () => {                                    // running on port 5000
  console.log("Server running on port 5000");
});