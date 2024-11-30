import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import CustomerDialog from './CustomerDialog';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AddCustomer({ onCustomerAdded }) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const addCustomer = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customer)
    };

    // asiakkaan haku api kutsulla, error viestit

    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', options);
      if (response.ok) {
        console.log('Customer added:', customer);
        onCustomerAdded(); 
        setOpen(false);
      } else {
        const responseData = await response.json();
        console.error('Failed to add customer:', responseData);
        alert('Failed to save customer: ' + responseData.message);
      }
    } catch (e) {
      console.error('Error adding customer:', e);
      alert('Error saving customer: ' + e.message);
    }
  };

  const handleSave = () => {
    addCustomer();
  };

  return (
    <>
      <Button class="addcustomer" onClick={handleClickOpen}><PersonAddIcon />Add Customer</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
