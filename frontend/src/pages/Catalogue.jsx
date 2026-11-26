import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';



const statusStyles = {
    'Available': 'bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded',
    'Under Maintenance': 'bg-amber-100 text-amber-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded',
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {equipment.map((item) => (
                <div key={item._id} className="bg-white p-4 shadow-md rounded">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mt-2" />
                   <div className="flex justify-between items-center mt-3">
                        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                        <span className={`px-2 py-1 rounded ${statusStyles[item.status]}`}>{item.status}</span>
                     </div>  
                     <h2 className="text-lg font-semibold mb-2">${item.pricePerHour}/hr</h2>                
                </div>
            ))}
        </div>
    </div>      
);


};



export default Catalogue;