import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import ProfileCompaniesList from './ProfileCompanyList';
import ProfileInvitationsList from './ProfileInvitationsList';
import ProfileRequestsList from './ProfileRequestsList';
import { useParams } from 'react-router-dom';

const ProfileLists = ({ isActiveUser }) => {
  const { t } = useTranslation();
  const params = useParams();
  const listStates = {
    COMPANY: 'Companies',
    INVITATIONS: 'Invitations',
    REQUESTS: 'Requests',
  };
  const [tableListState, setTableListState] = useState(listStates.COMPANY);
  const handleListStateChange = listState => {
    setTableListState(listState);
  };

  return (
    <>
      {isActiveUser ? (
        <>
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={() => handleListStateChange(listStates.COMPANY)}
              variant="contained"
              sx={{
                backgroundColor: '#e08e45',
                padding: '8px',
                borderRadius: 1,
                textAlign: 'center',
                mb: '8px',
                mr: '2px',
                ml: '2px',
                flex: 1,
                height: '48px',
                color: '#f9e2b2',
              }}
            >
              {t('UserProfile.MyCompanies')}
            </Button>
            <Button
              onClick={() => handleListStateChange(listStates.INVITATIONS)}
              variant="contained"
              sx={{
                backgroundColor: '#e08e45',
                padding: '8px',
                borderRadius: 1,
                textAlign: 'center',
                mb: '8px',
                mr: '2px',
                ml: '2px',
                flex: 1,
                height: '48px',
                color: '#f9e2b2',
              }}
            >
              {t('ProfileLists.Invitations')}
            </Button>
            <Button
              onClick={() => handleListStateChange(listStates.REQUESTS)}
              variant="contained"
              sx={{
                backgroundColor: '#e08e45',
                padding: '8px',
                borderRadius: 1,
                textAlign: 'center',
                mb: '8px',
                mr: '2px',
                ml: '2px',
                flex: 1,
                height: '48px',
                color: '#f9e2b2',
              }}
            >
              {t('ProfileLists.Requests')}
            </Button>
          </Box>

          {tableListState === listStates.COMPANY && (
            <ProfileCompaniesList userId={params.slug} />
          )}

          {tableListState === listStates.INVITATIONS && (
            <ProfileInvitationsList />
          )}

          {tableListState === listStates.REQUESTS && <ProfileRequestsList />}
        </>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: '#e08e45',
              padding: '8px',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#f9e2b2' }}>
              {t('ProfileLists.companies')}
            </Typography>
          </Box>

          <ProfileCompaniesList userId={params.slug} />
        </>
      )}
    </>
  );
};

export default ProfileLists;
