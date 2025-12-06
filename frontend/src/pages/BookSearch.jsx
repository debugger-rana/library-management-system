import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks } from '../services/bookService';
import Layout from '../components/layout/Layout';

const BookSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    serialNo: '',
    title: '',
    author: '',
    category: ''
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    const hasValue = Object.values(searchParams).some(value => value.trim() !== '');
    if (!hasValue) {
      setError('At least one search field must be filled');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await searchBooks(searchParams);
      setBooks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search books');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      serialNo: '',
      title: '',
      author: '',
      category: ''
    });
    setBooks([]);
    setError('');
    setSearched(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Search Books</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSearch} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  name="serialNo"
                  value={searchParams.serialNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter serial number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={searchParams.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={searchParams.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={searchParams.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {searched && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({books.length})
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {books.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {book.serialNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {book.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {book.availableCopies > 0 ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                              {book.availableCopies} / {book.totalCopies}
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                              Not Available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-6 py-4 text-gray-500 text-center">No books found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookSearch;
