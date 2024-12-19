import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';

const AnalyticsDateFilter = ({ chartData, setFilteredData }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    <>
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
    </>
  );
};

export default AnalyticsDateFilter;
