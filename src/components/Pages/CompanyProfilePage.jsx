import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import TextPage from '../UI/TextPage';
import companiesList from '../../data/companiesList';
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.slug);
  const company = companiesList.find(
    company => company.id.toString() === params.slug,
  );
  useEffect(() => {
    if (!company) {
      navigate('..', { relative: 'path' });
    }
  }, [company, navigate]);

  return (
    <TextPage title={company?.title}>
      <Grid container spacing={1}>
        <Grid
          size={3}
          sx={{
            display: 'flex',
            flexGrow: 1,
            padding: '8px',
            borderRadius: 1,
            border: '4px solid #e08e45',
            aspectRatio: 1 / 1,
          }}
        ></Grid>
        <Grid
          size={9}
          sx={{
            display: 'flex',
            flexGrow: 1,
            padding: '8px',
            borderRadius: 1,
            border: '4px solid #e08e45',
            height: '100%',
          }}
        >
          <Typography variant="body1">
            Post: {company?.post}
            <br />
            Phone: {company?.phone}
            <br />
          </Typography>
        </Grid>
      </Grid>
    </TextPage>
  );
};

export default CompanyProfilePage;
