import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';         // buttons and forms from bootstrap
import DatePicker from 'react-datepicker';              // reference https://refine.dev/blog/react-date-picker/#create-a-datepicker / https://reactdatepicker.com/#example-select-time-only
import 'react-datepicker/dist/react-datepicker.css';    // from react-datepicker (css file present in node module)
import './TruckRegistrationForm.css';                       

function TruckRegistrationForm({ addData }) {             // accepting addData as a prop which is passed from app.js

  const [registration, setRegistration] = useState('');   // declaring state variables and setter functions
  const [arrivalDate, setArrivalDate] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [bay, setBay] = useState('');

  const handleSubmit = async (e) => {                   // handleSubmit function which is called when submit button is clicked
    e.preventDefault();                                 // preventing default form submission 

    const arrivalDateTime = new Date(arrivalDate);
    arrivalDateTime.setHours(arrivalTime.getHours());         // retrieving hours from date-time picker
    arrivalDateTime.setMinutes(arrivalTime.getMinutes());     // retrieving minutes from date-time picker

    const departureDateTime = new Date(departureDate);
    departureDateTime.setHours(departureTime.getHours());
    departureDateTime.setMinutes(departureTime.getMinutes());

    const newTruckData = {
      registration: registration,
      arrivalDateTime: arrivalDateTime,
      departureDateTime: departureDateTime,
      bay: bay,
    };

    try {
      const response = await fetch('http://localhost:5000/api/trucks', {       // making POST request when new data is added from the form
        method: 'POST',       
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruckData),                             // JSON.stringify() method used to convert the newTruckData object into a JSON string
      });

      if (response.ok) {                                                // if response is ok, addData function is called to update the state with newly added truck
        addData(registration, arrivalDateTime, departureDateTime, bay);
        setRegistration('');                                            // setting the state variables to initial values
        setArrivalDate(null);
        setArrivalTime(null);
        setDepartureDate(null);
        setDepartureTime(null);
        setBay('');
      } else {
        console.log('Error creating truck:', response.statusText);
      }
    } catch (error) {
      console.log('Error occured while adding data. Please start the server');
    }
  };

  return (                                                        // JSX part
    <div className="addDataForm">
      <h2>ADD NEW TRUCK</h2> 
      <Form onSubmit={handleSubmit}>                            {/* forms from react bootstrap */}
        <Form.Group controlId="registration">
          <Form.Label>Registration number</Form.Label>
          <Form.Control         
            type="text"                                           // forms reference https://react-bootstrap-v3.netlify.app/components/forms/
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Enter registration number"
            required                                              // 'required' used wherever field is mandatory
          />
        </Form.Group>
        <Form.Group controlId="departureDate">
          <Form.Label>Departure Date</Form.Label>
          <br />
          <DatePicker
            selected={departureDate}                            // DatePicker reference https://refine.dev/blog/react-date-picker/#create-a-datepicker
            onChange={(date) => setDepartureDate(date)}
            placeholderText="Select departure date"
            required
            dateFormat="dd-MM-yyy"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="departureTime">
          <Form.Label>Departure Time</Form.Label>
          <br />
          <DatePicker
            selected={departureTime}
            onChange={(time) => setDepartureTime(time)}
            required
            placeholderText="Select departure Time"
            showTimeSelect
            showTimeSelectOnly                          // showing only time select option from DatePicker. reference - https://reactdatepicker.com/#example-select-time-only
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="arrivalDate">
          <Form.Label>Arrival Date</Form.Label>
          <br />
          <DatePicker
            selected={arrivalDate}
            onChange={(date) => setArrivalDate(date)}
            placeholderText="Select arrival date"
            required
            dateFormat="dd-MM-yyyy"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="arrivalTime">
          <Form.Label>Arrival Time</Form.Label>
          <br />
          <DatePicker
            selected={arrivalTime}
            onChange={(time) => setArrivalTime(time)}
            required
            placeholderText="Select arrival Time"
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="bay">
          <Form.Label>Bay (1 to 12)</Form.Label>
          <Form.Control
            as="select"
            value={bay}
            onChange={(e) => setBay(e.target.value)}      // setting bay value to selected value
            required
          >
            <option value="">Select Bay</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TruckRegistrationForm;

