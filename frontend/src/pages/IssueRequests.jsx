import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRequests, createRequest, approveRequest, rejectRequest, deleteRequest } from '../services/issueRequestService';
import { getAllBooks } from '../services/bookService';
import { getAllMembers } from '../services/memberService';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';

const IssueRequests = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    serialNo: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [requestsData, booksData, membersData] = await Promise.all([
        getAllRequests(),
        getAllBooks(),
        getAllMembers()
      ]);
      setRequests(requestsData.data || []);
      setBooks(booksData.data || []);
      setMembers(membersData.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-fill serial number when book is selected
    if (name === 'bookId') {
      const selectedBook = books.find(b => b._id === value);
      if (selectedBook) {
        setFormData(prev => ({ ...prev, serialNo: selectedBook.serialNo }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest(formData);
      setSuccess('Issue request created successfully!');
      setShowForm(false);
      setFormData({ bookId: '', memberId: '', serialNo: '' });
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    }
  };

  const handleApprove = async (id) => {
    const remarks = prompt('Enter approval remarks (optional):');
    if (remarks !== null) {
      try {
        await approveRequest(id, remarks);
        setSuccess('Request approved successfully!');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to approve request');
      }
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt('Enter rejection reason:');
    if (remarks) {
      try {
        await rejectRequest(id, remarks);
        setSuccess('Request rejected successfully!');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to reject request');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteRequest(id);
        setSuccess('Request deleted successfully!');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete request');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Issue Requests</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              New Request
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create Issue Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Book *</label>
                  <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a book</option>
                    {books.filter(b => b.availableCopies > 0 && b.type !== 'movie').map(book => (
                      <option key={book._id} value={book._id}>
                        {book.title} ({book.serialNo})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Member *</label>
                  <select
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a member</option>
                    {members.filter(m => m.isActive).map(member => (
                      <option key={member._id} value={member._id}>
                        {member.name} ({member.membershipNo})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Serial Number *</label>
                  <input
                    type="text"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ bookId: '', memberId: '', serialNo: '' });
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
                {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.requestId}</td>
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <div className="font-medium">{request.book?.title}</div>
                      <div className="text-gray-500">{request.serialNo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <div className="font-medium">{request.member?.name}</div>
                      <div className="text-gray-500">{request.member?.membershipNo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{request.remarks || '-'}</td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request._id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="text-orange-600 hover:text-orange-900 mr-3"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <p className="px-6 py-8 text-gray-500 text-center">No issue requests found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IssueRequests;
