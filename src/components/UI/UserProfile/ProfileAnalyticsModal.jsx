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
import { useGetUserAnalytics } from '../../../utils/router/hooks/profileAnalyticsHooks';

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
  const getAnalytics = useGetUserAnalytics();

  const createStatisticData = useCallback(data => {
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
        label: `Quiz ${statistic_obj.id}`,
        data: statisticData,
      };
    });
    setChartData({
      labels: allDates,
      datasets: datasets,
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    async function statisticInfo() {
      const analiticsData = await getAnalytics();
      if (analiticsData) {
        createStatisticData(analiticsData);
      }
    }

    setLoading(false);

    statisticInfo();
  }, [createStatisticData, getAnalytics]);

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
