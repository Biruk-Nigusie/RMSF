import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.type === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-dark-blue mb-8">Welcome to RMS</h1>
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
        <p className="text-teal text-lg mb-6">
          Residential Management System - Your complete solution for property
          management.
        </p>
        <button className="bg-medium-green hover:bg-teal text-white px-6 py-3 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
