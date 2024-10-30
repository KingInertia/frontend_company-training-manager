import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Box } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: theme.spacing(1),
  borderRadius: 4,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#e5ab6c',
  color: '#2c2c2c',
  elevation: 3,
  boxShadow: theme.shadows[3],
  flexDirection: 'column',
}));
const TextPage = ({ title, titleVariant = 'h4', children }) => {
  return (
    <Item>
      {title && (
        <Box
          sx={{
            backgroundColor: '#e08e45',
            padding: '8px',
            borderRadius: 1,
            textAlign: 'center',
            mb: '16px',
          }}
        >
          <Typography variant={titleVariant} sx={{ color: '#f9e2b2' }}>
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Item>
  );
};

export default TextPage;
