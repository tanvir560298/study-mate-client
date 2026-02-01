import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white border rounded-2xl shadow-md p-8 text-center">
        <p className="text-sm font-semibold text-gray-500">StudyMate</p>

        <h1 className="text-6xl md:text-7xl font-extrabold mt-3">404</h1>

        <h2 className="text-2xl md:text-3xl font-bold mt-4">
          Oops! Page not found
        </h2>

        <p className="text-gray-600 mt-3">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to studying.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90"
          >
            Go to Start
          </Link>

          <Link
            to="/app"
            className="px-5 py-3 rounded-xl border font-semibold hover:bg-gray-100"
          >
            Go to Home
          </Link>

          <Link
            to="/app/find-partners"
            className="px-5 py-3 rounded-xl border font-semibold hover:bg-gray-100"
          >
            Find Partners
          </Link>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          Tip: Check the URL or use the navigation links above.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
