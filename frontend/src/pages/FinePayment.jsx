import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTransactions, payFine } from '../services/transactionService';
import Layout from '../components/layout/Layout';

const FinePayment = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions();
      const data = response.data || [];
      // Filter transactions with pending fines
      const pendingFines = data.filter(
        (t) => t.fine > 0 && !t.finePaid && t.status === 'returned'
      );
      setTransactions(pendingFines);
    } catch (err) {
      setError('Failed to load pending fines');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = async (transactionId) => {
    setError('');
    setSuccess('');
    setPaymentLoading(transactionId);

    try {
      await payFine(transactionId);
      setSuccess('Fine paid successfully!');
      
      // Remove the paid transaction from list
      setTransactions(transactions.filter(t => t._id !== transactionId));
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setPaymentLoading(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">Loading...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Fine Payment</h1>
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

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Fines ({transactions.length})
            </h2>
          </div>

          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fine Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{transaction.book?.title}</div>
                          <div className="text-gray-500">{transaction.book?.serialNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{transaction.member?.name}</div>
                          <div className="text-gray-500">{transaction.member?.membershipNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.returnDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-red-600">
                          ₹{transaction.fine}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handlePayFine(transaction._id)}
                          disabled={paymentLoading === transaction._id}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                        >
                          {paymentLoading === transaction._id ? 'Processing...' : 'Pay Fine'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pending fines</h3>
              <p className="mt-1 text-sm text-gray-500">
                All fines have been cleared!
              </p>
            </div>
          )}
        </div>

        {/* Fine Calculation Info */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Fine Calculation</h3>
          <p className="text-sm text-blue-700">
            Fine is calculated at <strong>₹5 per day</strong> for books returned after the due date.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FinePayment;
