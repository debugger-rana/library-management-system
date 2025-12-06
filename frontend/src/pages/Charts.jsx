import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getDashboardStats, getPopularBooks, getFineReport } from '../services/reportService';
import { getAllBooks } from '../services/bookService';
import Layout from '../components/layout/Layout';

const Charts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const [statsResponse, popularResponse, booksResponse] = await Promise.all([
        getDashboardStats(),
        getPopularBooks(),
        getAllBooks()
      ]);

      setStats(statsResponse.data);
      setPopularBooks(popularResponse.data || []);

      // Process books data for category distribution
      const books = booksResponse.data || [];
      const categories = {};
      const statuses = { Available: 0, Issued: 0, Damaged: 0 };

      books.forEach(book => {
        if (book.type !== 'movie') {
          // Count by category
          categories[book.category] = (categories[book.category] || 0) + 1;
          
          // Count by status
          if (statuses.hasOwnProperty(book.status)) {
            statuses[book.status]++;
          }
        }
      });

      setCategoryData(Object.entries(categories).map(([name, value]) => ({ name, value })));
      setStatusData(Object.entries(statuses).map(([name, value]) => ({ name, value })));
    } catch (err) {
      setError('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading charts...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Charts & Analytics</h1>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Total Books</h3>
            <p className="text-4xl font-bold mt-2">{stats?.books?.total || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Available</h3>
            <p className="text-4xl font-bold mt-2">{stats?.books?.available || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Active Members</h3>
            <p className="text-4xl font-bold mt-2">{stats?.members?.active || 0}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-lg shadow text-white">
            <h3 className="text-sm font-medium opacity-90">Pending Fines</h3>
            <p className="text-4xl font-bold mt-2">₹{stats?.fines?.unpaid || 0}</p>
          </div>
        </div>

        {/* Book Status Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Book Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Books by Category - Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Books by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Number of Books" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Books - Horizontal Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Most Popular Books (Top 10)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={popularBooks.slice(0, 10).map(item => ({
                name: item.bookDetails?.title?.substring(0, 30) || 'Unknown',
                issues: item.issueCount
              }))}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="issues" fill="#82ca9d" name="Times Issued" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Library Stats Overview - Line Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Library Statistics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'Books', Total: stats?.books?.total || 0, Available: stats?.books?.available || 0 },
                { name: 'Members', Total: stats?.members?.total || 0, Active: stats?.members?.active || 0 },
                { name: 'Issues', Active: stats?.transactions?.activeIssues || 0, Overdue: stats?.transactions?.overdueBooks || 0 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total" fill="#8884d8" />
              <Bar dataKey="Available" fill="#82ca9d" />
              <Bar dataKey="Active" fill="#ffc658" />
              <Bar dataKey="Overdue" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Charts;
