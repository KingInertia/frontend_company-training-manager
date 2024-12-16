import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import autocolors from 'chartjs-plugin-autocolors';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  autocolors,
);

const Chart = ({ chartData, entityManage }) => {
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          onClick: (e, legendItem) => {
            if (entityManage) entityManage({ e, id: legendItem.text });
          },
        },
        autocolors: {
          mode: 'dataset',
        },
      },
      spanGaps: true,
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    }),
    [entityManage],
  );

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default React.memo(Chart);
