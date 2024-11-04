import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const NavigationBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const pages = ['/companies', '/users', '/about'];
  const buttonNames = [
    t('navigation.companies'),
    t('navigation.users'),
    t('navigation.about'),
  ];

  const langChange = event => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('currentLang', lang);
  };

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
            {pages.map((page, index) => (
              <Button
                component={Link}
                to={page}
                key={page}
                sx={{
                  my: 1,
                  display: 'block',
                  color: isActive(page) ? '#d24136' : 'white',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                }}
              >
                {buttonNames[index]}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              minWidth: 120,
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="select-language-label">Lang</InputLabel>
              <Select
                labelId="select-language-label"
                id="select-language"
                value={language}
                label="Age"
                onChange={langChange}
              >
                <MenuItem value={'en'}>EN</MenuItem>
                <MenuItem value={'uk'}>UK</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
