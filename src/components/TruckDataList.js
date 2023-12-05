import React, { useState, useEffect } from 'react';
import moment from 'moment';                            // to manahe date and time formats. reference - https://momentjs.com/
import { Button } from 'react-bootstrap';
import './TruckDataList.css';

function TruckDataList({ data, deleteData, addDepartureTime }) {    // accepting props from app.js
  const [searchItem, setSearchItem] = useState('');               // setting search state to search the registration number from the list of data
  const [filteredData, setFilteredData] = useState([]);         // setting filtered data to filter the data based on search

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {              // reference and understanding for search bar, from- https://dev.to/salehmubashar/search-bar-in-react-js-545l
    const filtered = data.filter((item) => {
      const registrationMatch = item.registration.toLowerCase().includes(searchItem.toLowerCase());
      return registrationMatch;
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="SearchBar">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}           // to enter the registration number to be searched
          placeholder="Search registration no."
        />
        <button onClick={handleSearch}>Search</button>              {/* calling handleSearch function when search button is clicked */}
      </div>
      {filteredData.length > 0 ? (
        <div className="DataList">
          <h3>LIST OF TRUCKS</h3>
          <ul>
            {filteredData.map((item, index) => (
              <div key={index}>
                <p>
                  <strong>REGISTRATION NUMBER:</strong> {item.registration}       {/* Showing registration */}
                </p>
                <p>
                  <strong>DEPARTURE DATE & TIME:</strong>{' '}                    {/* showing formatted departure date and time together */}
                  {moment(item.departureDateTime).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <strong>ARRIVAL DATE & TIME:</strong>{' '}                      {/* showing formatted arrival date and time together */}
                  {moment(item.arrivalDateTime).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>
                  <strong>BAY:</strong> {item.bay}                                {/* showing the bay */}
                </p>
                <Button variant="danger" type="delete" onClick={() => deleteData(item.registration)}>      {/* deleteData passed as a prop from app.js*/}
                  Delete Truck
                </Button>
                <Button variant="warning" onClick={() => addDepartureTime(item.registration)}>      {/* addDepartureTime passed as a prop from app.js */}
                  Add 5 minutes
                </Button>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Data not available</p>
      )}
    </>
  );
}

export default TruckDataList;








