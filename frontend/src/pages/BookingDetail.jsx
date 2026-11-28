import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { statusStyles, formatDate, customerName } from "./bookingStatus";

const BookingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(`/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError(error.response?.data?.message || 'Failed to fetch booking.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchBooking();
  }, [id, user]);

  const updateStatus = async (status) => {
    setActionError(null);
    setUpdating(true);
    try {
      const response = await axiosInstance.patch(
        `/api/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setBooking((prev) => ({ ...prev, status: response.data.status }));
    } catch (error) {
      setActionError(error.response?.data?.message || 'Failed to update booking.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading booking...</p>;
  if (err) return <p className="text-center text-red-600 mt-10">{err}</p>;
  if (!booking) return null;

  const equipment = booking.equipmentId;
  const customer = booking.userId;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">&larr; Back to dashboard</Link>

      <div className="flex justify-between items-center mt-3">
        <h1 className="text-2xl font-bold text-gray-700">{equipment?.name || 'Unknown equipment'}</h1>
        <span className={`px-2 py-1 rounded text-xs ${statusStyles[booking.status] || ''}`}>
          {booking.status}
        </span>
      </div>

      {equipment?.imageUrl && (
        <img src={equipment.imageUrl} alt={equipment.name} className="w-full h-48 object-cover rounded mt-4" />
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div><dt className="font-semibold inline">Customer: </dt><dd className="inline">{customerName(customer)}</dd></div>
        {customer?.email && <div><dt className="font-semibold inline">Email: </dt><dd className="inline">{customer.email}</dd></div>}
        <div><dt className="font-semibold inline">Pickup: </dt><dd className="inline">{formatDate(booking.pickupDate)}</dd></div>
        <div><dt className="font-semibold inline">Return: </dt><dd className="inline">{formatDate(booking.returnDate)}</dd></div>
        {equipment?.pricePerHour != null && (
          <div><dt className="font-semibold inline">Rate: </dt><dd className="inline">${equipment.pricePerHour}/hr</dd></div>
        )}
        <div><dt className="font-semibold inline">Total: </dt><dd className="inline">${Number(booking.total).toFixed(2)}</dd></div>
      </dl>

      {actionError && <p className="text-red-600 mt-4">{actionError}</p>}

      {booking.status === 'Pending' && (
        <div className="flex gap-2 mt-6">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={updating}
            onClick={() => updateStatus('Approved')}
          >
            Approve
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
            disabled={updating}
            onClick={() => updateStatus('Rejected')}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
