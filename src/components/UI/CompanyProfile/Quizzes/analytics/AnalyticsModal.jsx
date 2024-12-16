import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import TextPage from '../../../TextPage';
import Chart from './Chart';
import { format } from 'date-fns';
import { useGetAnalytics } from '../../../../../utils/router/hooks/companyAnalyticsHooks';
import { analitycsStates } from '../../../../../constants/companyConst';

const AnalyticsModal = ({ open, onClose, companyId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filteredData, setFilteredData] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [menuLocation, setMenuLocation] = useState(null);
  const [analyticsType, setAnalyticsType] = useState(analitycsStates.USERS);
  const getAnalytics = useGetAnalytics();

  const createStatisticData = useCallback(
    data => {
      const allDates = [];
      data.forEach(statistic_obj => {
        statistic_obj.dynamic_time.forEach(item => {
          const date = format(new Date(item.day), 'yyyy-MM-dd');
          if (!allDates.includes(date)) {
            allDates.push(date);
          }
        });
      });

      allDates.sort((a, b) => new Date(a) - new Date(b));

      const datasets = data.map(statistic_obj => {
        const statisticData = allDates.map(date => {
          const entry = statistic_obj.dynamic_time.find(
            item => format(new Date(item.day), 'yyyy-MM-dd') === date,
          );

          return entry ? entry.average_score : null;
        });

        return {
          label:
            analyticsType === analitycsStates.USERS
              ? `User ${statistic_obj.id}`
              : `Quiz ${statistic_obj.id}`,
          data: statisticData,
        };
      });

      setChartData({
        labels: allDates,
        datasets: datasets,
      });
    },
    [analyticsType],
  );

  useEffect(() => {
    setLoading(true);
    async function statisticInfo() {
      let analiticsData = {};
      if (analyticsType === analitycsStates.USERS) {
        analiticsData = await getAnalytics({ company_id: companyId });
      } else {
        analiticsData = await getAnalytics({
          company_id: companyId,
          user_id: selectedEntity,
        });
      }
      if (analiticsData) {
        createStatisticData(analiticsData);
      }
    }

    setLoading(false);

    statisticInfo();
  }, [
    analyticsType,
    companyId,
    getAnalytics,
    createStatisticData,
    selectedEntity,
  ]);

  const handleEntityManage = useCallback(
    ({ e, id }) => {
      if (selectedEntity === id) {
        setSelectedEntity(null);
        setMenuLocation(null);
      } else {
        setSelectedEntity(id.split(' ')[1]);
        setMenuLocation(e.native.target);
      }
    },
    [selectedEntity],
  );

  const handleQuizAnalytics = () => {
    setAnalyticsType(analitycsStates.QUIZZES);
    setMenuLocation(null);
  };
  const handleUsersAnalytics = () => {
    setAnalyticsType(analitycsStates.USERS);
  };

  const handleOpenPage = () => {
    if (analyticsType === analitycsStates.USERS)
      navigate(`/users/${selectedEntity}`);
    else {
      navigate(`/companies/${companyId}/quizzes/${selectedEntity}`);
    }
  };

  const handleDateFilter = () => {
    if (!startDate && !endDate) {
      setFilteredData(null);
      return;
    }

    const filteredDates = chartData.labels.filter(date => {
      const currentDate = new Date(date);
      return (
        (!startDate || currentDate >= startDate) &&
        (!endDate || currentDate <= endDate)
      );
    });

    const newFilteredData = {
      labels: filteredDates,
      datasets: chartData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.filter((_, index) =>
          filteredDates.includes(chartData.labels[index]),
        ),
      })),
    };

    setFilteredData(newFilteredData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: '1400px',
          display: 'flex',
          margin: 'auto',
          marginTop: '80px',
          minHeight: '600px',
        }}
      >
        <TextPage title={t('CompanyProfile.OpenAnalytics')}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={t('AnalyticsModal.StartDate')}
                      value={startDate}
                      onChange={setStartDate}
                      slots={{ textField: TextField }}
                    />
                    <DatePicker
                      label={t('AnalyticsModal.EndDate')}
                      value={endDate}
                      onChange={setEndDate}
                      slots={{ textField: TextField }}
                    />
                  </LocalizationProvider>
                  <Button
                    variant="contained"
                    onClick={handleDateFilter}
                    sx={{ height: '56px' }}
                  >
                    {t('AnalyticsModal.Apply')}
                  </Button>
                  {analyticsType === analitycsStates.QUIZZES && (
                    <Button
                      variant="contained"
                      onClick={handleUsersAnalytics}
                      sx={{ height: '56px' }}
                    >
                      {t('AnalyticsModal.BackToUserStatistics')}
                    </Button>
                  )}
                </Box>
                <Chart
                  chartData={filteredData || chartData}
                  entityManage={handleEntityManage}
                />
                <Menu
                  anchorEl={menuLocation}
                  open={Boolean(menuLocation)}
                  onClose={() => setMenuLocation(null)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {analyticsType === analitycsStates.USERS && (
                    <MenuItem onClick={handleQuizAnalytics}>
                      {t('AnalyticsModal.ShowAllQuizzesStatistics')}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleOpenPage}>
                    {t('AnalyticsModal.NavigateToPage')}
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </TextPage>
      </Box>
    </Modal>
  );
};

export default AnalyticsModal;
