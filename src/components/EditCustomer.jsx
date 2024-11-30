import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'; 

export default function EditCustomer({ currentCustomer, editCustomer }) {
    const [customer, setCustomer] = useState(currentCustomer);
    const [open, setOpen] = useState(false);
    
    const url = currentCustomer._links.self.href;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = event => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        editCustomer(url, customer);
        console.log(customer);    
        setOpen(false);
    }

  // asiakkaan muokkaus lomake/dialogimodaali
    return (
      <>
      <Button onClick={handleClickOpen}><EditIcon></EditIcon></Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Edit</DialogTitle>
          <TextField
            label="First Name"
            name="firstname"
            value={customer.firstname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={customer.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={customer.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
