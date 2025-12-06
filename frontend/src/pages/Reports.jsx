import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOverdueBooks, getPopularBooks, getFineReport, getMasterListBooks, getMasterListMovies, getMasterListMembers } from '../services/reportService';
import Layout from '../components/layout/Layout';

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overdue');
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [fineReport, setFineReport] = useState([]);
  const [masterBooks, setMasterBooks] = useState([]);
  const [masterMovies, setMasterMovies] = useState([]);
  const [masterMembers, setMasterMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [overdueData, popularData, fineData, booksData, moviesData, membersData] = await Promise.all([
        getOverdueBooks(),
        getPopularBooks(),
        getFineReport(),
        getMasterListBooks(),
        getMasterListMovies(),
        getMasterListMembers()
      ]);
      setOverdueBooks(overdueData.data || []);
      setPopularBooks(popularData.data || []);
      setFineReport(fineData.data?.transactions || []);
      setMasterBooks(booksData.data || []);
      setMasterMovies(moviesData.data || []);
      setMasterMembers(membersData.data || []);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">Loading reports...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overdue')}
              className={`${
                activeTab === 'overdue'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overdue Books ({overdueBooks.length})
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`${
                activeTab === 'popular'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Popular Books
            </button>
            <button
              onClick={() => setActiveTab('fines')}
              className={`${
                activeTab === 'fines'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Fine Report
            </button>
            <button
              onClick={() => setActiveTab('masterBooks')}
              className={`${
                activeTab === 'masterBooks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Master List: Books
            </button>
            <button
              onClick={() => setActiveTab('masterMovies')}
              className={`${
                activeTab === 'masterMovies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Master List: Movies
            </button>
            <button
              onClick={() => setActiveTab('masterMembers')}
              className={`${
                activeTab === 'masterMembers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Master List: Members
            </button>
          </nav>
        </div>

        {/* Overdue Books Report */}
        {activeTab === 'overdue' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Overdue Books</h2>
            </div>
            <div className="overflow-x-auto">
              {overdueBooks.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Overdue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {overdueBooks.map((item) => {
                      const daysOverdue = Math.ceil(
                        (new Date() - new Date(item.dueDate)) / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <tr key={item._id}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{item.book?.title}</div>
                              <div className="text-gray-500">{item.book?.serialNo}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{item.member?.name}</div>
                              <div className="text-gray-500">{item.member?.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.issueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                              {daysOverdue} days
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No overdue books</p>
              )}
            </div>
          </div>
        )}

        {/* Popular Books Report */}
        {activeTab === 'popular' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Popular Books</h2>
            </div>
            <div className="overflow-x-auto">
              {popularBooks.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Times Issued</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {popularBooks.map((book, index) => (
                      <tr key={book._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {book.serialNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {book.issueCount} times
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No data available</p>
              )}
            </div>
          </div>
        )}

        {/* Fine Report */}
        {activeTab === 'fines' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Fine Report</h2>
            </div>
            <div className="overflow-x-auto">
              {fineReport.length > 0 ? (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fine Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fineReport.map((item) => (
                        <tr key={item._id}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{item.book?.title}</div>
                              <div className="text-gray-500">{item.book?.serialNo}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{item.member?.name}</div>
                              <div className="text-gray-500">{item.member?.membershipNumber}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.returnDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                            ₹{item.fine}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.finePaid ? (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                Paid
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <div className="flex justify-end">
                      <div className="text-sm">
                        <span className="text-gray-600">Total Fines: </span>
                        <span className="text-xl font-bold text-red-600">
                          ₹{fineReport.reduce((sum, item) => sum + item.fine, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No fine records found</p>
              )}
            </div>
          </div>
        )}

        {/* Master List: Books */}
        {activeTab === 'masterBooks' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Master List: Books</h2>
            </div>
            <div className="overflow-x-auto">
              {masterBooks.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Procurement Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {masterBooks.filter(book => book.type !== 'movie').map((book) => (
                      <tr key={book._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{book.serialNo}</td>
                        <td className="px-6 py-4 text-sm">{book.title}</td>
                        <td className="px-6 py-4 text-sm">{book.author}</td>
                        <td className="px-6 py-4 text-sm">{book.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            book.status === 'Available' ? 'bg-green-100 text-green-800' :
                            book.status === 'Issued' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">₹{book.cost}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {book.procurementDate ? new Date(book.procurementDate).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No books found</p>
              )}
            </div>
          </div>
        )}

        {/* Master List: Movies */}
        {activeTab === 'masterMovies' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Master List: Movies</h2>
            </div>
            <div className="overflow-x-auto">
              {masterMovies.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Director</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Procurement Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {masterMovies.filter(movie => movie.type === 'movie').map((movie) => (
                      <tr key={movie._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{movie.serialNo}</td>
                        <td className="px-6 py-4 text-sm">{movie.title}</td>
                        <td className="px-6 py-4 text-sm">{movie.author}</td>
                        <td className="px-6 py-4 text-sm">{movie.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            movie.status === 'Available' ? 'bg-green-100 text-green-800' :
                            movie.status === 'Issued' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {movie.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">₹{movie.cost}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {movie.procurementDate ? new Date(movie.procurementDate).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No movies found</p>
              )}
            </div>
          </div>
        )}

        {/* Master List: Members */}
        {activeTab === 'masterMembers' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Master List: Members</h2>
            </div>
            <div className="overflow-x-auto">
              {masterMembers.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aadhar Card</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Membership Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {masterMembers.map((member) => (
                      <tr key={member._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.membershipNo}</td>
                        <td className="px-6 py-4 text-sm">{member.name}</td>
                        <td className="px-6 py-4 text-sm">{member.email}</td>
                        <td className="px-6 py-4 text-sm">{member.phone}</td>
                        <td className="px-6 py-4 text-sm">{member.aadharCard || '-'}</td>
                        <td className="px-6 py-4 text-sm">{member.membershipType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-8 text-gray-500 text-center">No members found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
