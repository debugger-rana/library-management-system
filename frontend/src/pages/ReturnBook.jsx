import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { returnBook } from '../services/transactionService';
import { validateBookReturn } from '../utils/validation';
import Layout from '../components/layout/Layout';

const ReturnBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serialNo: '',
    returnDate: new Date().toISOString().split('T')[0]
  });
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({});
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setTransactionDetails(null);
    
    const validationErrors = validateBookReturn(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const data = await returnBook(formData);
      setTransactionDetails(data);
      setSuccess('Book returned successfully!');
      
      // Reset form
      setTimeout(() => {
        setFormData({
          serialNo: '',
          returnDate: new Date().toISOString().split('T')[0]
        });
        setTransactionDetails(null);
        setSuccess('');
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to return book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Return Book</h1>
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
                Book Serial Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.serialNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter book serial number"
              />
              {errors.serialNo && (
                <p className="mt-1 text-sm text-red-600">{errors.serialNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.returnDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.returnDate && (
                <p className="mt-1 text-sm text-red-600">{errors.returnDate}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Return Book'}
            </button>
          </form>
        </div>

        {/* Transaction Details */}
        {transactionDetails && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Book:</span>
                <span className="font-medium">{transactionDetails.book?.title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Member:</span>
                <span className="font-medium">{transactionDetails.member?.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Date:</span>
                <span className="font-medium">
                  {new Date(transactionDetails.issueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">
                  {new Date(transactionDetails.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Return Date:</span>
                <span className="font-medium">
                  {new Date(transactionDetails.returnDate).toLocaleDateString()}
                </span>
              </div>

              {transactionDetails.fine > 0 && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-medium">Late Fine:</span>
                      <span className="text-red-600 font-bold text-xl">
                        ₹{transactionDetails.fine}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Fine rate: ₹5 per day
                    </p>
                  </div>
                  
                  {!transactionDetails.finePaid && (
                    <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mt-2">
                      <p className="font-medium">Fine payment pending!</p>
                      <p className="text-sm">Please proceed to Fine Payment section to clear the dues.</p>
                    </div>
                  )}
                </>
              )}

              {transactionDetails.fine === 0 && (
                <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p className="font-medium">No fine applicable - Book returned on time!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReturnBook;
