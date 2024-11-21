import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ShopModal from '../components/Modal.jsx'; // Import the modal component
import axios from 'axios';
import DotLoader from "../components/loader.jsx";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Shops = () => {
  const { id } = useParams(); // Get the floor ID from the URL parameter
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null); // State to manage the selected shop for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Handle filter type change
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(''); // Reset filter value when filter type changes
  };

  // Handle filter value change
  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const params = { floorNumber: id };

        // Add the selected filter to the request if it exists
        if (filterType && filterValue) {
          params[filterType] = filterValue;
        }

        const response = await axios.get('http://localhost:5000/shops/details', { params });
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchShops();
  }, [id, filterType, filterValue]); // Trigger fetch when filter or floor changes

  // Function to open the modal with the selected shop's details
  const openModal = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  // Function to navigate to the next floor
  const goToNextFloor = () => {
    if (parseInt(id) < 4) {
      navigate(`/shops/${parseInt(id) + 1}`);
    }
  };

  // Function to navigate to the previous floor
  const goToPreviousFloor = () => {
    if (parseInt(id) > 1) {
      navigate(`/shops/${parseInt(id) - 1}`);
    }
  };

  return (
    <div data-theme="emerald" className="bg-base-200">
      <Navbar />

      {/* Navigation buttons for previous and next floors */}
      <div className="flex justify-evenly p-4 mt-16">
        <button
          onClick={goToPreviousFloor}
          className="btn btn-lg btn-primary flex mt-4"
          disabled={parseInt(id) <= 1}
        >
          <ArrowLeft />
          Previous Floor
        </button>

        {/* Filter dropdown */}
        <div className="flex p-4 gap-10">
          <select
            name="filterType"
            value={filterType}
            onChange={handleFilterTypeChange}
            className="select select-bordered h-16 text-xl"
          >
            <option value="">Select Filter</option>
            <option value="shopNumber">Shop Number</option>
            <option value="shopName">Shop Name</option>
            <option value="ownerName">Owner Name</option>
            <option value="ownerNumber">Owner Number</option>
            <option value="ownerEmail">Owner Email</option>
            <option value="amountDue">Amount Due</option>
          </select>
          {filterType && (
            <input
              type="text"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={`Enter ${filterType}`}
              className="input input-bordered h-16 text-xl"
            />
          )}
        </div>

        <button
          onClick={goToNextFloor}
          className="btn btn-lg btn-primary flex mt-4"
          disabled={parseInt(id) >= 4}
        >
          Next Floor
          <ArrowRight />
        </button>
      </div>


      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <DotLoader /> {/* Show loader while data is loading */}
        </div>
      ) : (
        // Display shops when loading is false
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mt-2">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="card bg-base-100 shadow-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => openModal(shop)} // Open modal when a shop is clicked
            >
              <div className="card-body">
                <h2 className="card-title text-2xl">Shop {shop.shopNumber}</h2>
                <p className="text-2xl">Owner: {shop.owner.name}</p>
                <p className="text-2xl text-gray-500">Amount Due : <span className={shop.amountDue > 0 ? 'text-red-500' : 'text-green-500'}>{shop.amountDue}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show modal only if it's open */}
      {isModalOpen && selectedShop && (
        <ShopModal
          isOpen={isModalOpen}
          onClose={closeModal}
          shop={selectedShop} // Pass the selected shop details
        />
      )}

      <Footer />
    </div>
  );
};

export default Shops;
