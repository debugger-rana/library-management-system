import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks } from '../services/bookService';
import { getAllMembers } from '../services/memberService';
import { issueBook } from '../services/transactionService';
import { validateBookIssue, calculateDueDate } from '../utils/validation';
import Layout from '../components/layout/Layout';

const IssueBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: calculateDueDate(new Date().toISOString().split('T')[0], 15)
  });
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksData, membersData] = await Promise.all([
        getAllBooks(),
        getAllMembers()
      ]);
      const books = booksData.data || [];
      const members = membersData.data || [];
      setBooks(books.filter(book => book.availableCopies > 0));
      setMembers(members.filter(member => member.isActive));
    } catch (err) {
      setError('Failed to load books and members');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let updatedFormData = { ...formData, [name]: value };
    
    // Auto-calculate due date when issue date changes
    if (name === 'issueDate') {
      updatedFormData.dueDate = calculateDueDate(value, 15);
    }
    
    setFormData(updatedFormData);
    setErrors({});
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const validationErrors = validateBookIssue(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await issueBook(formData);
      setSuccess('Book issued successfully!');
      setFormData({
        bookId: '',
        memberId: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: calculateDueDate(new Date().toISOString().split('T')[0], 15)
      });
      fetchData(); // Refresh books list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Issue Book</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Book <span className="text-red-500">*</span>
              </label>
              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.bookId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select Book --</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.serialNo} - {book.title} ({book.availableCopies} available)
                  </option>
                ))}
              </select>
              {errors.bookId && (
                <p className="mt-1 text-sm text-red-600">{errors.bookId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Member <span className="text-red-500">*</span>
              </label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.memberId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select Member --</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.membershipNumber} - {member.name}
                  </option>
                ))}
              </select>
              {errors.memberId && (
                <p className="mt-1 text-sm text-red-600">{errors.memberId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.issueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.issueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.issueDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (Return Date) <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Maximum 15 days from issue date
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Issuing...' : 'Issue Book'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default IssueBook;
