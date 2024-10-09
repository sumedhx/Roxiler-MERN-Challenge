import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Stats({ month }) {
  let [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
      console.log(res.data); // Log the response to check its structure
      setData(res.data);
    } catch (error) {
      console.log(error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setData(null);
    };
  }, [month]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Prepare data for charts
  const barChartData = {
    labels: data ? Object.keys(data.barChartData) : [],
    datasets: [{
      label: 'Number of Items',
      data: data ? Object.values(data.barChartData) : [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const pieChartData = {
    labels: data ? Object.keys(data.pieChartData) : [],
    datasets: [{
      data: data ? Object.values(data.pieChartData) : [],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'], // Adjust colors as needed
    }]
  };

  return (
    <>
      <h2>Stats for {monthNames[month - 1]}</h2>
      <div className="stats-container">
        <div className="totals">
          {loading ? <p>Loading...</p> : <Totals stats={data?.statsData} />}
        </div>
        <div className="charts-container">
          <div className="chart">
            <h3>Bar Chart: Price Range vs Number of Items</h3>
            <Bar data={barChartData} />
          </div>
          <div className="chart">
            <h3>Pie Chart: Sold vs Unsold Items</h3>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </>
  );
}

function Totals({ stats }) {
  return (
    <div className="totals-stats">
      <p><b>Total Sale:</b> ₹{stats?.totalSale}</p>
      <p><b>Total Sold Items:</b> {stats?.soldCount}</p>
      <p><b>Total Unsold Items:</b> {stats?.unsoldCount}</p>
    </div>
  );
}
