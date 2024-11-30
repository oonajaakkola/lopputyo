import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, TextField } from "@mui/material";
import EditCustomer from './EditCustomer'; 
import AddTraining from './AddTraining'; 
import AddCustomer from './AddCustomer'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

export default function CustomerList({ refreshTrainings }) {
  const [customers, setCustomers] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [columnDefs] = useState([
    {
      headerName: 'Actions',
      field: '_links.self.href',
      sortable: false,
      filter: false,
      cellRenderer: params => (
        <div>
          <Button onClick={() => deleteCustomer(params.data._links.self.href)}><DeleteIcon /></Button>
          <EditCustomer currentCustomer={params.data} editCustomer={editCustomer} />
          <AddTraining customerHref={params.data._links.self.href} onTrainingAdded={fetchCustomers} />
        </div>
      ),
    },
    { field: 'firstname', headerName: 'First Name', sort: 'asc' },
    { field: 'lastname', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'streetaddress', headerName: 'Street Address' },
    { field: 'postcode', headerName: 'Postcode' },
    { field: 'city', headerName: 'City' },
  ]);

  // ag-grid column definitions

  const defaultColDef = {
    sortable: true,
    filter: true
  };

  // api kutsu asiakkaiden hakemiseksi

  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
      const data = await response.json();
      setCustomers(data._embedded.customers);
    } catch (e) {
      console.error(e);
    }
  };

  // asiakkaan poisto

  const deleteCustomer = async (url) => {
    const options = {
      method: 'DELETE'
    };
    try {
      // varmistusviesti
      if (window.confirm("Do you want to delete this customer?")) {
        const response = await fetch(url, options);
        if (response.ok) {
          fetchCustomers();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

   // asiakkaan muokkaus

  const editCustomer = async (url, customer) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customer)
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        fetchCustomers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customerlist">
      <div className="header-container">
        <TextField
          label="Search"
          variant="outlined"
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
          style={{ marginBottom: '10px', marginRight: '1' }}
        />
        <AddCustomer onCustomerAdded={fetchCustomers} />
      </div>
      <div className="ag-theme-material" style={{ width: "95%", height: 600 }}>
        {Array.isArray(customers) && (
          <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            quickFilterText={quickFilterText}
          />
        )}
      </div>
    </div>
  );
}
