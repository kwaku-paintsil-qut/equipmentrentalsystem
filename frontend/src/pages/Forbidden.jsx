import { Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';


const Forbidden = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mt-56 text-center text-gray-600">
        Forbidden
      </h1>
        <p className="text-gray-600 text-center mt-4">
          403 - You are not authorized to access this page.
        </p>
        <Link to="/catalogue" className="text-blue-500 hover:underline text-left block mt-40 indent-80">
        <ChevronLeftIcon className="inline-block w-4 h-8 mr-1" />
          Back to Catalogue
        </Link> 
    </div>
  );
};

export default Forbidden;