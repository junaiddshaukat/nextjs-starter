export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-6" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          <div className="h-6 bg-gray-700 rounded w-2/3" />
          <div className="h-6 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
} 