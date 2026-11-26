import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const Catalogue = () => {

const [ equipment, setEquipment ] = useState([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axiosInstance.get('/api/equipment');
                setEquipment(response.data);
            } catch (error) {
                console.error('Error fetching equipment:', error);
            }       
        };

        fetchEquipment();
    }, []);


return (
    <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">Catalogue</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {equipment.map((item) => (
                <div key={item._id} className="bg-white p-4 shadow-md rounded">
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-gray-800 font-bold">${item.pricePerHour}</p>
                </div>
            ))}
        </div>
    </div>      
);


};




export default Catalogue;