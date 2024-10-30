import React from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextPage from '../UI/TextPage';

const AboutPage = () => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={8} sx={{ display: 'flex', flexGrow: 1 }}>
        <TextPage title="About us" titleVariant="h4">
          <Box
            sx={{
              padding: '8px',
              borderRadius: 1,
              mb: '16px',
              border: '4px solid #e08e45',
            }}
          >
            <Typography variant="body1">
              Text Text Text Text Text Text Text Text Text Text Text Text Text
              Text Text Text Text Text Text Text Text Text Text Text Text Text
            </Typography>
          </Box>
        </TextPage>
      </Grid>
      <Grid size={4} sx={{ display: 'flex', flexGrow: 1 }}>
        <TextPage title="Сontacts" titleVariant="h4">
          <Box
            sx={{
              padding: '8px',
              borderRadius: 1,
              mb: '16px',
              border: '4px solid #e08e45',
            }}
          >
            <Typography variant="body1">
              Link 1 <br />
              Link 2 <br />
              Link 3 <br />
            </Typography>
          </Box>
        </TextPage>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
