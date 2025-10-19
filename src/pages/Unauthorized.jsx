import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
        <ShieldX className="mx-auto text-red-500 mb-4" size={64} />
        <h1 className="text-2xl font-bold text-dark-blue mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="bg-medium-green hover:bg-teal text-white px-6 py-2 rounded-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
