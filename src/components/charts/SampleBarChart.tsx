import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function SampleBarChart() {
  const data = {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [
      {
        label: 'Applications',
        data: [12, 19, 7, 11, 14, 8, 10],
        backgroundColor: 'rgba(18,158,240,0.6)'
      }
    ]
  };
  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };
  return <Bar data={data} options={options} />;
}