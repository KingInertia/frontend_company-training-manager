import React from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextPage from '../UI/TextPage';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={8} sx={{ display: 'flex', flexGrow: 1 }}>
        <TextPage title={t('aboutPage.aboutUs')} titleVariant="h4">
          <Box
            sx={{
              padding: '8px',
              borderRadius: 1,
              mb: '16px',
              border: '4px solid #e08e45',
            }}
          >
            <Typography variant="body1">{t('aboutPage.aboutText')}</Typography>
          </Box>
        </TextPage>
      </Grid>
      <Grid size={4} sx={{ display: 'flex', flexGrow: 1 }}>
        <TextPage title={t('aboutPage.contacts')} titleVariant="h4">
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
