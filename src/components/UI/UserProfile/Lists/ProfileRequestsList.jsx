import React from 'react';
import TableList from '../../TableList';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import {
  sentRequestsList,
  receivedRequestsList,
  makeRequestDecision,
} from '../../../../store/companies/requests/requestsActions';
import { selectRequests } from '../../../../store/companies/requests/requestsSelectors';
import { setSnackbarMessage } from '../../../../store/UI/snackbarSlice';

const ProfileRequestsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { error, receivedRequests, sentRequests } = useSelector(selectRequests);
  const listStates = {
    SENT: 'Sent',
    RECEIVED: 'Received',
  };
  const requestDecision = {
    APPROVE: 'approve',
    REJECT: 'reject',
    CANCEL: 'cancel',
  };
  const [tableListState, setTableListState] = useState(listStates.SENT);
  const [openRequestsDialog, setOpenRequestsDialog] = useState(false);
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const rowNames = [
    t('ProfileRequestsList.Sender'),
    t('ProfileRequestsList.Receiver'),
    t('ProfileRequestsList.Company'),
    t('ProfileRequestsList.SendDate'),
    t('ProfileRequestsList.Status'),
  ];

  const clearList = requests => {
    if (!requests) return [];
    return requests.map(request => {
      const { sender, receiver, company, ...rest } = request;
      return rest;
    });
  };

  const cleanReceivedRequestsList = useMemo(
    () => clearList(receivedRequests),
    [receivedRequests],
  );
  const cleanSentRequestsList = useMemo(
    () => clearList(sentRequests),
    [sentRequests],
  );

  useEffect(() => {
    dispatch(sentRequestsList());
    dispatch(receivedRequestsList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setSnackbarMessage(error));
    }
  }, [error, dispatch]);

  const handleListStateChange = listState => {
    setTableListState(listState);
  };

  const handleManageRequest = id => {
    if (tableListState === listStates.RECEIVED) {
      const request = cleanReceivedRequestsList.find(
        request => request.id === id,
      );
      setRequest(request);
    } else {
      const request = cleanSentRequestsList.find(request => request.id === id);
      setRequest(request);
    }
    setOpenRequestsDialog(true);
  };

  const handleRequestDecision = async decision => {
    setLoading(true);

    try {
      await makeRequestDecision({
        decision,
        requestId: request.id,
      });

      if (tableListState === listStates.RECEIVED) {
        dispatch(receivedRequestsList());
      } else {
        dispatch(sentRequestsList());
      }

      dispatch(
        setSnackbarMessage(
          t('ProfileRequestsList.RequestProcessedSuccessfully'),
        ),
      );
    } catch (error) {
      const errorMessage = error.response
        ? Object.values(error.response.data).join(' ')
        : error.message;
      dispatch(setSnackbarMessage(errorMessage));
    }
    setLoading(false);
    setOpenRequestsDialog(false);
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
          {t('ProfileRequestsList.Sent')}
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
          {t('ProfileRequestsList.Received')}
        </Button>
      </Box>
      {tableListState === listStates.SENT && (
        <>
          {!sentRequests ? (
            <Typography>Loading...</Typography>
          ) : (
            tableListState.length > 0 && (
              <TableList
                headTextSize="h7"
                rowNames={rowNames}
                list={cleanSentRequestsList}
                onClick={handleManageRequest}
              />
            )
          )}
        </>
      )}
      {tableListState === listStates.RECEIVED && (
        <>
          {!receivedRequests ? (
            <Typography>Loading...</Typography>
          ) : (
            tableListState.length > 0 && (
              <TableList
                headTextSize="h7"
                rowNames={rowNames}
                list={cleanReceivedRequestsList}
                onClick={handleManageRequest}
              />
            )
          )}
        </>
      )}
      <Dialog open={openRequestsDialog}>
        <DialogTitle>
          {t('ProfileRequestsList.WhatToDoWithThisRequest')}
        </DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <Typography>
            {tableListState === listStates.RECEIVED
              ? t('ProfileRequestsList.SentBy', {
                  companyName: request.company_name,
                })
              : t('ProfileRequestsList.SentToUser', {
                  receiverName: request.receiver_name,
                })}
          </Typography>
        </DialogContent>
        {loading ? (
          <Typography>{t('ProfileRequestsList.ApplyingTheChanges')}</Typography>
        ) : (
          <DialogActions>
            {tableListState === listStates.RECEIVED ? (
              <>
                <Button
                  onClick={() => handleRequestDecision(requestDecision.APPROVE)}
                  color="primary"
                >
                  {t('ProfileRequestsList.Approve')}
                </Button>
                <Button
                  onClick={() => handleRequestDecision(requestDecision.REJECT)}
                  color="primary"
                >
                  {t('ProfileRequestsList.Reject')}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => handleRequestDecision(requestDecision.CANCEL)}
                color="primary"
              >
                {t('ProfileRequestsList.Cancel')}
              </Button>
            )}
            <Button onClick={() => setOpenRequestsDialog(false)} color="error">
              {t('ProfileRequestsList.DecideLater')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ProfileRequestsList;
