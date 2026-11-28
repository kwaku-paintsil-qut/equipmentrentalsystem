import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { statusStyles, formatDate, customerName } from "./bookingStatus";

const Dashboard = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/api/bookings', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchBookings();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">Bookings Dashboard</h1>
      {loading && <p className="text-center text-gray-600">Loading bookings...</p>}
      {err && <p className="text-center text-red-600">{err}</p>}
      {!loading && !err && bookings.length === 0 && (
        <p className="text-center text-gray-600">No bookings yet.</p>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Equipment</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Return</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="px-4 py-3">{booking.equipmentId?.name || 'Unknown equipment'}</td>
                  <td className="px-4 py-3">{customerName(booking.userId)}</td>
                  <td className="px-4 py-3">{formatDate(booking.pickupDate)}</td>
                  <td className="px-4 py-3">{formatDate(booking.returnDate)}</td>
                  <td className="px-4 py-3">${Number(booking.total).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${statusStyles[booking.status] || ''}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/dashboard/bookings/${booking._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {booking.status === 'Pending' ? 'View & approve' : 'View'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
