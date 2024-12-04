import React from 'react';
import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import {
  sentInvitationsList,
  receivedInvitationsList,
  makeInvitationDecision,
} from '../../../../store/companies/invitations/invitationsActions';
import { selectInvitations } from '../../../../store/companies/invitations/invitationsSelectors';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';

const ProfileCompaniesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, receivedInvitations, sentInvitations } =
    useSelector(selectInvitations);
  const listStates = {
    SENT: 'Sent',
    RECEIVED: 'Received',
  };
  const invitationDecision = {
    ACCEPT: 'accept',
    DECLINE: 'decline',
    REVOKE: 'revoke',
  };
  const [tableListState, setTableListState] = useState(listStates.SENT);
  const [openInvitationsDialog, setOpenInvitationsDialog] = useState(false);
  const [invitation, setInvitation] = useState({});
  const [loading, setLoading] = useState(false);
  const rowNames = [
    t('ProfileInvitationsList.Sender'),
    t('ProfileInvitationsList.Receiver'),
    t('ProfileInvitationsList.Company'),
    t('ProfileInvitationsList.SendDate'),
    t('ProfileInvitationsList.Status'),
  ];

  const clearList = Invitations => {
    if (!Invitations) return [];
    return Invitations.map(Invitation => {
      const { sender, receiver, company, ...rest } = Invitation;
      return rest;
    });
  };

  const cleanReceivedInvitesList = useMemo(
    () => clearList(receivedInvitations),
    [receivedInvitations],
  );
  const cleanSentInvitesList = useMemo(
    () => clearList(sentInvitations),
    [sentInvitations],
  );

  useEffect(() => {
    dispatch(sentInvitationsList());
    dispatch(receivedInvitationsList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleListStateChange = listState => {
    setTableListState(listState);
  };

  const handleManageInvitation = id => {
    if (tableListState === listStates.RECEIVED) {
      const invitation = cleanReceivedInvitesList.find(
        invitation => invitation.id === id,
      );
      setInvitation(invitation);
    } else {
      const invitation = cleanSentInvitesList.find(
        invitation => invitation.id === id,
      );
      setInvitation(invitation);
    }
    setOpenInvitationsDialog(true);
  };

  const handleInvitationDecision = async decision => {
    setLoading(true);
    try {
      await makeInvitationDecision({
        decision,
        invitationId: invitation.id,
      });

      if (tableListState === listStates.RECEIVED) {
        dispatch(receivedInvitationsList());
      } else {
        dispatch(sentInvitationsList());
      }

      dispatch(
        setSnackbarMessage(
          t('ProfileInvitationsList.InvitationProcessedSuccessfully'),
        ),
      );
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
    }
    setLoading(false);
    setOpenInvitationsDialog(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={() => handleListStateChange(listStates.SENT)}
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
          {t('ProfileInvitationsList.Sent')}
        </Button>
        <Button
          onClick={() => handleListStateChange(listStates.RECEIVED)}
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
          {t('ProfileInvitationsList.Received')}
        </Button>
      </Box>
      {tableListState === listStates.SENT && (
        <>
          {!cleanSentInvitesList ? (
            <Typography>Loading...</Typography>
          ) : (
            cleanSentInvitesList.length > 0 && (
              <TableList
                headTextSize="h7"
                rowNames={rowNames}
                list={cleanSentInvitesList}
                onClick={handleManageInvitation}
              />
            )
          )}
        </>
      )}
      {tableListState === listStates.RECEIVED && (
        <>
          {!cleanReceivedInvitesList ? (
            <Typography>Loading...</Typography>
          ) : (
            cleanReceivedInvitesList.length > 0 && (
              <TableList
                headTextSize="h7"
                rowNames={rowNames}
                list={cleanReceivedInvitesList}
                onClick={handleManageInvitation}
              />
            )
          )}
        </>
      )}
      <Dialog open={openInvitationsDialog}>
        <DialogTitle>
          {t('ProfileInvitationsList.WhatToDoWithInvitation')}
        </DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <Typography>
            {tableListState === listStates.RECEIVED
              ? t('ProfileInvitationsList.SentBy', {
                  companyName: invitation.company_name,
                })
              : t('ProfileInvitationsList.SentToUser', {
                  receiverName: invitation.receiver_name,
                })}
          </Typography>
        </DialogContent>
        {loading ? (
          <Typography>
            {t('ProfileInvitationsList.ApplyingTheChanges')}
          </Typography>
        ) : (
          <DialogActions>
            {tableListState === listStates.RECEIVED ? (
              <>
                <Button
                  onClick={() =>
                    handleInvitationDecision(invitationDecision.ACCEPT)
                  }
                  color="primary"
                >
                  {t('ProfileInvitationsList.Accept')}
                </Button>
                <Button
                  onClick={() =>
                    handleInvitationDecision(invitationDecision.DECLINE)
                  }
                  color="primary"
                >
                  {t('ProfileInvitationsList.Decline')}
                </Button>
              </>
            ) : (
              <Button
                onClick={() =>
                  handleInvitationDecision(invitationDecision.REVOKE)
                }
                color="primary"
              >
                {t('ProfileInvitationsList.RevokeInvitation')}
              </Button>
            )}
            <Button
              onClick={() => setOpenInvitationsDialog(false)}
              color="error"
            >
              {t('ProfileInvitationsList.DecideLater')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ProfileCompaniesList;
