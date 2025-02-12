import { useState } from 'react';
import { Leaf, MapPin, CloudSun, Sprout, Info } from 'lucide-react';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        soilType: '',
        weatherConditions: ''
    });
    const [crops, setCrops] = useState([]);

    const [advice, setAdvice] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const farmerResponse = await fetch('http://localhost:3001/farmers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!farmerResponse.ok) {
                throw new Error('Failed to register farmer');
            }

            const cropUrl = new URL('http://localhost:3001/crops');
            cropUrl.search = new URLSearchParams({
                location: formData.location,
                soilType: formData.soilType,
                weatherConditions: formData.weatherConditions
            });

            const cropResponse = await fetch(cropUrl);
            
            if (!cropResponse.ok) {
                throw new Error('Failed to fetch crop recommendations');
            }

            const cropData = await cropResponse.json();
            
            setCrops(cropData);
            setAdvice(`Based on your location, soil type, and weather conditions, we recommend growing ${cropData[0].name}.`);
        } catch (err) {
            setError('Failed to get crop advice. Please try again.');
            console.error(err);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-6 overflow-hidden">
            <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-green-600 text-white p-6 flex items-center">
                    <Leaf className="mr-4" size={40} />
                    <h1 className="text-2xl font-bold">Crop Advisory System</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Info className="mr-2 text-green-600" size={16} />
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <MapPin className="mr-2 text-green-600" size={16} />
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                                placeholder="Farm location"
                                required
                                // input tag is completed
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Sprout className="mr-2 text-green-600" size={16} />
                                Soil Type
                            </label>
                            <select
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                                required
                            >
                                <option value="" className="text-gray-500">Select Soil Type</option>
                                <option value="sandy" className="text-black">Sandy</option>
                                <option value="clay" className="text-black">Clay</option>
                                <option value="loamy" className="text-black">Loamy</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <CloudSun className="mr-2 text-green-600" size={16} />
                                Weather Conditions
                            </label>
                            <select
                                name="weatherConditions"
                                value={formData.weatherConditions}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                                required
                            >
                                <option value="" className="text-gray-500">Select Weather</option>
                                <option value="dry" className="text-black">Dry</option>
                                <option value="wet" className="text-black">Wet</option>
                                <option value="moderate" className="text-black">Moderate</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Get Crop Advice'
                        )}
                    </button>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            {error}
                        </div>
                    )}
                </form>

                {advice && (
                    <div className="bg-green-50 p-6 border-t">
                        <h2 className="text-xl font-bold text-green-800 mb-4">Crop Advice</h2>
                        <div className="bg-white shadow rounded-lg p-4">
                            <p className="text-gray-700 mb-4">{advice}</p>
                            <h3 className="font-semibold text-green-700 mb-2">Recommended Crops:</h3>
                            <ul className="space-y-2">
                                {crops.map((crop) => (
                                    <li key={crop._id} className="flex items-center text-gray-600">
                                        <Sprout className="mr-2 text-green-500" size={16} />
                                        {crop.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;