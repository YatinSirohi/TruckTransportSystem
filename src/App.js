import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TruckRegistrationForm from './components/TruckRegistrationForm';
import TruckDataList from './components/TruckDataList';
import moment from 'moment';                              // To format date and time formats- https://momentjs.com/
import axios from 'axios';                                // To manage requests

function App() {
  const [data, setData] = useState([]);                     // specifying state to store and manage the truck data
  const [activeTab, setActiveTab] = useState('register');  // To switch between tabs - one where truck is added and other where we see trucks data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trucks'); // Getting the data from given api. Date and time in (UTC) ISO 8601 standard. https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
      setData(response.data);
    } catch (error) {
      console.log('Error occured while fetching data. Please start the server', error);
    }
  };

  const deleteTruck = async (registration) => {
    try {
      await axios.delete(`http://localhost:5000/api/trucks/${registration}`);           // deleting truck data from the server
      const updatedData = data.filter((item) => item.registration !== registration);   // filtering the 'data' array to remove the deleted truck and updating the 'data' state with the updated array.
      setData(updatedData);
    } catch (error) {
      console.log('Error occured while deleting truck. Please start the server', error);
    }
  };

  const addDepartureTime = async (registration) => {
    try {
      const truckData = data.find((item) => item.registration === registration);

      const updatedDepartureDateTime = moment(truckData.departureDateTime)
        .add(5, 'minutes')
        .toDate();

      await axios.put(`http://localhost:5000/api/trucks/${registration}`, {         // making PUT request to the server to add 5 min in departure time
        departureDateTime: updatedDepartureDateTime,
      });

      const updatedData = data.map((item) => {                       // using map to go through the array and adding departure time to the specified truck registration
        if (item.registration === registration) {
          return { ...item, departureDateTime: updatedDepartureDateTime };
        }
        return item;
      });
      setData(updatedData);
    } catch (error) {
      console.log('Error occured while updating truck data. Please start the server.', error);
    }
  };

  const handleTabChange = (eventKey) => {           // updates the 'activeTab' state with the new value when the tab is changed.
    setActiveTab(eventKey);
  };

  const addData = (registration, arrivalDateTime, departureDateTime, bay) => {
    const newData = {                                           // creating new truck object
      registration: registration,
      arrivalDateTime: arrivalDateTime,
      departureDateTime: departureDateTime,
      bay: bay,
    };
    setData([...data, newData]);                                  // adding in the exisiting data
  };

  return (
    <div>
      <NavBar activeTab={activeTab} handleTabChange={handleTabChange} />    {/* Passing activeTab and handleTabChange as a prop */}
      <div className="container">
        {activeTab === 'register' && <TruckRegistrationForm addData={addData} />}     {/*passing addData as a prop */}
        {activeTab === 'list' && (
          <TruckDataList
            data={data}                                                               // passing data as a prop
            deleteData={deleteTruck}                                                  // passing deleteTruck as a prop
            addDepartureTime={addDepartureTime}                                       // passing addDepartureTime as a prop
          />
        )}
      </div>
    </div>
  );
}

export default App;



