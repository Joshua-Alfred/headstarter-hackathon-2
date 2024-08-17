import { useState } from 'react';
import { Button, Container, Typography, TextField } from '@mui/material';

export default function Home() {
  const [name, setName] = useState('');

  const handleClick = () => {
    alert(`Web scraping not implemented yet!`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Web Scraper!
      </Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Go!
      </Button>
    </Container>
  );
}
