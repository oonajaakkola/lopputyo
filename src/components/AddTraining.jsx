import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, TextField, DialogContent } from '@mui/material';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

export default function AddTraining({ customerHref, onTrainingAdded }) {
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: ''
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
    setTraining({ ...training, [name]: value });
  };

  const addTraining = async () => {
    const formattedTraining = {
      ...training,
      customer: customerHref
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formattedTraining)
    };

    // treenien haku api kutsulla

    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', options);
      if (response.ok) {
        console.log('Training added:', formattedTraining);
        onTrainingAdded();
        setOpen(false);
      } else {
        
        // virheviesti jos treenin lisäys ei onnistu
        const responseData = await response.json();
        console.error('Failed to add training:', responseData);
      }
    } catch (e) {
      console.error('Error adding training:', e);
    }
  };

  const handleSave = () => {
    addTraining();
  };

  // lomake

  return (
    <>
      <Button onClick={handleClickOpen}><MoreTimeIcon /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            name="duration"
            type="number"
            value={training.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Activity"
            name="activity"
            type="text"
            value={training.activity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
