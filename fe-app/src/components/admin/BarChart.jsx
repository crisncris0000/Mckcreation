import React from 'react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {}

const data = {
  labels: ["Rent", "Groceries", "Entertainment", "Transportation", "Utilities"],
  datasets: [
      {
        label: "Expenses",
        data: [300, 500, 900, 1200, 100],
        backgroundColor: "rgb(255, 99, 132, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
}

const BarChart = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart;