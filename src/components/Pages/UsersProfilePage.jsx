import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import TextPage from '../UI/TextPage';
import usersList from '../../data/usersList';
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
const UsersProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.slug);
  const user = usersList.find(user => user.id.toString() === params.slug);

  useEffect(() => {
    if (!user) {
      navigate('..', { relative: 'path' });
    }
  }, [user, navigate]);

  return (
    <TextPage>
      <Grid container spacing={1}>
        <Grid
          size={3}
          sx={{
            display: 'flex',
            flexGrow: 1,
            padding: '8px',
            borderRadius: 1,
            border: '4px solid #e08e45',
            height: '360px',
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
            height: '360px',
          }}
        >
          <Typography variant="body1">
            Name: {user?.name}
            <br />
            Post: {user?.post}
            <br />
            Phone: {user?.phone}
            <br />
          </Typography>
        </Grid>
      </Grid>
    </TextPage>
  );
};

export default UsersProfilePage;
