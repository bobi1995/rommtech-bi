const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
            <div className="ml-4 text-gray-900">Зареждане...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
