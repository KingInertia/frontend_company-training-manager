import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../PageContainer';
import Chart from './Chart';
import AnalyticsDateFilter from './AnalyticsDateFilter';
import {
  useFetchCompanyScores,
  useStatisticData,
} from '../../../../../utils/hooks/companyAnalyticsHooks';
import { analitycStates } from '../../../../../constants/companyConst';

const CompanyAnalyticsModal = ({ open, onClose, companyId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuLocation, setMenuLocation] = useState(null);
  const [analyticsType, setAnalyticsType] = useState(analitycStates.USERS);
  const fetchCompanyScores = useFetchCompanyScores();
  const createStatisticData = useStatisticData(t);

  useEffect(() => {
    if (analyticsType === analitycStates.USERS) {
      setLoading(true);
      async function statisticInfo() {
        const analiticsData = await fetchCompanyScores({
          company_id: companyId,
        });
        if (analiticsData) {
          const data = createStatisticData(analiticsData, analitycStates.USERS);
          setChartData(data);
        }
        setLoading(false);
      }

      statisticInfo();
    }
  }, [companyId, fetchCompanyScores, createStatisticData, analyticsType]);

  const handleEntityManage = useCallback(
    ({ e, id }) => {
      if (selectedItem === id) {
        setSelectedItem(null);
        setMenuLocation(null);
      } else {
        setSelectedItem(id);
        setMenuLocation(e.native.target);
      }
    },
    [selectedItem],
  );

  const handleQuizAnalytics = async () => {
    setLoading(true);
    const analiticsData = await fetchCompanyScores({
      company_id: companyId,
      user_id: selectedItem,
    });

    if (analiticsData) {
      const data = createStatisticData(analiticsData, analitycStates.QUIZZES);
      setChartData(data);
      setAnalyticsType(analitycStates.QUIZZES);
    }
    setMenuLocation(null);
    setLoading(false);
  };
  const handleUsersAnalytics = async () => {
    setLoading(true);
    const analiticsData = await fetchCompanyScores({
      company_id: companyId,
    });

    if (analiticsData) {
      const data = createStatisticData(analiticsData, analitycStates.USERS);
      setChartData(data);
      setAnalyticsType(analitycStates.USERS);
    }
    setLoading(false);
  };

  const handleOpenPage = () => {
    if (analyticsType === analitycStates.USERS)
      navigate(`/users/${selectedItem}`);
    else {
      navigate(`/companies/${companyId}/quizzes/${selectedItem}`);
    }
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
                  {analyticsType === analitycStates.QUIZZES && (
                    <Button
                      variant="contained"
                      onClick={handleUsersAnalytics}
                      sx={{
                        height: '56px',
                        mr: 1,
                        ml: 1,
                        backgroundColor: '#e08e45',
                        color: '#f9e2b2',
                      }}
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
                  {analyticsType === analitycStates.USERS && (
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
        </PageContainer>
      </Box>
    </Modal>
  );
};

export default CompanyAnalyticsModal;
