const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Outer ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
      </div>
      <p className="text-xl font-semibold text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">Please wait a moment...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
