import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const Booking = () => {
    const { equipmentId } = useParams();
    const [equipment, setEquipment] = useState(null);
    const [bookingData, setBookingData] = useState({
        equipmentId: equipmentId,
        userId: '', // This should be set to the logged-in user's ID
        pickupDate: '',
        returnDate: ''
    });

const { user } = useAuth();

const [ error, setError] = useState(' ');
const [ success, setSuccess ] = useState(' ');

const handleSubmit = async (e) => {
  e.preventDefault();                       
  setError('');
  setSuccess('');
  try {
    await axiosInstance.post(
      '/api/bookings',
      { equipmentId: equipmentId, pickupDate: bookingData.pickupDate, returnDate: bookingData.returnDate },                     
      { headers: { Authorization: `Bearer ${user.token}` } } 
    );
    setSuccess('Booking request sent! Status: Pending');
  } catch (err) {
    setError(err.response?.data?.message || 'Booking failed. Please try again.');
  }
};


    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axiosInstance.get(`/api/equipment/${equipmentId}`);
                setEquipment(response.data);
            } catch (error) {
                console.error('Error fetching equipment:', error);
            }
        };

        fetchEquipment();
    }, [equipmentId]);

    const handleChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };


    if (!equipment) return <div>Loading...</div>;

    return ( 
        <div className='max-w-md mx-auto mt-10 bg-white p-6 rounded shadow'>
            <h1 className='text-2xl font-bold mb-4 text-center text-gray-600'>Equipment Booking: {equipment.name}</h1>
            <p className='text-lg font-semibold mb-2'>${equipment.pricePerHour}/hr</p>
            <img src={equipment.imageUrl} alt={equipment.name} className='w-full h-48 object-cover rounded mb-4'></img>
            <form onSubmit={handleSubmit}>
                <label className='block mb-1'>
                    Pickup Date:
                    <input className='block w-full border rounded p-2 mt-1 mb-3' type="datetime-local" name="pickupDate" value={bookingData.pickupDate} onChange={handleChange} required />
                </label>
                <label className='block mb-1'>
                    Return Date:
                    <input className='block w-full border rounded p-2 mt-1 mb-3' type="datetime-local" name="returnDate" value={bookingData.returnDate} onChange={handleChange} required />
                </label>
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-700">{success}</p>}
                <button className='w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800' type="submit">Book Now</button>
            </form>
        </div>
    );
}

export default Booking;
