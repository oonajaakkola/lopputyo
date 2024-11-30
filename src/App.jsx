import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import CustomerList from './components/CustomerList';
import Training from './components/Trainings';
import logo from './assets/sports_logo.svg';
import './index.css';

function App() {
  return (
    <Router class="routernav">
      <Container maxWidth="x1">
        <AppBar position="static">
          <Toolbar>
            <Box component="img" sx={{ height: 35 }} alt="Dumbbell logo" src={logo} />
            <Typography variant='h6'>Personal Trainer App</Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex">
          <Box flexShrink={0} mr={2}>
            <Button component={Link} to="/" fullWidth>Customers</Button>
            <Button component={Link} to="/trainings" fullWidth>Trainings</Button>
          </Box>
          <Box flexGrow={1}>
            <Routes>
              <Route path="/" element={<CustomerList />} />
              <Route path="/trainings" element={<Training />} />
            </Routes>
          </Box>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
