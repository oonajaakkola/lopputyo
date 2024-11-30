import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export default function Training() {
  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
      const data = await response.json();
      setTrainings(data);
    } catch (e) {
      console.error(e);
    }
  };

  // treenin poisto

  const deleteTraining = async (id) => {
    const url = `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`;
    const options = {

      // käytetään apin metodia poistamiseen
      method: 'DELETE'
    };
    try {

      // varmistusviesti

      if (window.confirm('Do you want to delete this session?')) {
        const response = await fetch(url, options);
        if (response.ok) {
          fetchTrainings();     
        }
      }
      // virhe konsoliin jos poisto ei toimi

    } catch (e) {
      console.error('Error deleting training:', e);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // taulukko defs
  
  const columnDefs = [
    {
      field: 'date',
      headerName: 'Date',
      valueFormatter: params => dayjs(params.value).format('DD-MM-YYYY')
    },
    { field: 'duration', headerName: 'Duration' },
    { field: 'activity', headerName: 'Activity' },
    {
      field: 'customer',
      headerName: 'Customer',
      valueGetter: params => `${params.data.customer.firstname} ${params.data.customer.lastname}`
    },
    {
      field: 'id',
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: params => (
        <Button onClick={() => deleteTraining(params.data.id)}><DeleteIcon></DeleteIcon></Button>
      )
    }
  ];

  return (
    <div className="traininglist">
      <div className="ag-theme-material" style={{ height: 600, width: '95%' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>
    </div>
  );
}
