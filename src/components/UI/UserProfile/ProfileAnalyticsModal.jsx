import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextPage from '../TextPage';
import Chart from '../CompanyProfile/Quizzes/analytics/Chart';
import { format } from 'date-fns';
import { useCurrentUserScores } from '../../../utils/router/hooks/userAnalyticsHooks';

const ProfileAnalyticsModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filteredData, setFilteredData] = useState(null);
  const currentUserScores = useCurrentUserScores();

  const createStatisticData = useCallback(
    data => {
      const allDates = [];

      data.forEach(item => {
        const date = format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss');
        if (!allDates.includes(date)) {
          allDates.push(date);
        }
      });

      const datasets = [
        {
          label: t('ProfileAnalyticsModal.QuizResults'),
          data: allDates.map(date => {
            const entry = data.find(
              item =>
                format(new Date(item.date), 'yyyy-MM-dd HH:mm:ss') === date,
            );
            return entry ? entry.score : null;
          }),
        },
      ];

      setChartData({
        labels: allDates,
        datasets: datasets,
      });
    },
    [t],
  );

  useEffect(() => {
    setLoading(true);
    async function statisticInfo() {
      const analiticsData = await currentUserScores();
      if (analiticsData) {
        createStatisticData(analiticsData);
      }
      setLoading(false);
    }
    statisticInfo();
  }, [createStatisticData, currentUserScores]);

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
                    sx={{
                      height: '56px',
                      mr: 1,
                      ml: 1,
                      backgroundColor: '#e08e45',
                      color: '#f9e2b2',
                    }}
                  >
                    {t('AnalyticsModal.Apply')}
                  </Button>
                </Box>
                <Chart chartData={filteredData || chartData} />
              </Box>
            </>
          )}
        </TextPage>
      </Box>
    </Modal>
  );
};

export default ProfileAnalyticsModal;
