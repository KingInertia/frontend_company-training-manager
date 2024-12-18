import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PageContainer from '../PageContainer';
import Chart from '../CompanyProfile/Quizzes/analytics/Chart';
import AnalyticsDateFilter from '../CompanyProfile/Quizzes/analytics/AnalyticsDateFilter';
import {
  useCurrentUserScores,
  useStatisticData,
} from '../../../utils/hooks/userAnalyticsHooks';

const ProfileAnalyticsModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filteredData, setFilteredData] = useState(null);
  const currentUserScores = useCurrentUserScores();
  const createStatisticData = useStatisticData(t);

  useEffect(() => {
    setLoading(true);
    async function statisticInfo() {
      const analiticsData = await currentUserScores();
      if (analiticsData) {
        const data = createStatisticData(analiticsData);
        setChartData(data);
      }
      setLoading(false);
    }
    statisticInfo();
  }, [createStatisticData, currentUserScores]);

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
        <PageContainer title={t('CompanyProfile.OpenAnalytics')}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box>
                <Box>
                  <AnalyticsDateFilter
                    setFilteredData={setFilteredData}
                    chartData={chartData}
                  />
                </Box>
                <Chart chartData={filteredData || chartData} />
              </Box>
            </>
          )}
        </PageContainer>
      </Box>
    </Modal>
  );
};

export default ProfileAnalyticsModal;
