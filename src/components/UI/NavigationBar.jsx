import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
const pages = ['COMPANIES', 'USERS', 'ABOUT'];

const NavigationBar = () => {
  const location = useLocation();

  const isActive = page => {
    return location.pathname === '/' + page.toLowerCase();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#eb8a3e',
      }}
    >
      <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="."
            sx={{
              mr: 2,

              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            START PAGE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                component={Link}
                to={page.toLowerCase()}
                key={page}
                sx={{
                  my: 1,
                  display: 'block',
                  color: isActive(page) ? '#d24136' : 'white',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
