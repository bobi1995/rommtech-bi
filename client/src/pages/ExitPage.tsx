const ExitPage = () => {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
    return;
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-gray-800 mb-4">
        Излизане от системата
      </div>
      <div className="text-lg text-gray-600">
        Сигурен ли си, че искаш да излезеш?
      </div>

      <div className="gap-4 flex mt-10">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSignOut}
        >
          Да
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Не
        </button>
      </div>
    </div>
  );
};

export default ExitPage;
