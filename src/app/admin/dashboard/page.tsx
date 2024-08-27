'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/api/analytics');
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Google Analytics Data</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Sessions</th>
            <th className="px-4 py-2">Pageviews</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.map((data: any, index: number) => (
            <tr key={index}>
              <td className="border px-4 py-2">{data.date}</td>
              <td className="border px-4 py-2">{data.sessions}</td>
              <td className="border px-4 py-2">{data.pageviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;
