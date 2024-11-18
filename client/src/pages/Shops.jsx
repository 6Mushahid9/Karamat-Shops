import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ShopModal from '../components/Modal.jsx'; // Import the modal component

// Generate random data for shops
const generateShopData = () => {
  const shopData = [];
  for (let i = 1; i <= 600; i++) {
    shopData.push({
      shopNo: i,
      name: `Shop ${i}`,
      description: `This is a description for Shop ${i}. It offers a variety of products.`,
      priceRange: `$${Math.floor(Math.random() * 100) + 10} - $${Math.floor(Math.random() * 100) + 50}`,
    });
  }
  return shopData;
};

const Shops = () => {
  const { id } = useParams(); // Get the floor ID from the URL parameter
  const shopData = generateShopData();
  
  const [selectedShop, setSelectedShop] = useState(null); // State to manage the selected shop for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Determine the starting and ending index for the current set of shops
  const startIndex = (id - 1) * 150;
  const endIndex = startIndex + 150;

  // Slice the shop data to show only the current set of shops
  const shopsToShow = shopData.slice(startIndex, endIndex);

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

  return (
    <div data-theme="emerald" className="bg-base-200">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 mt-16">
        {shopsToShow.map((shop) => (
          <div
            key={shop.shopNo}
            className="card bg-base-100 shadow-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => openModal(shop)} // Open modal when a shop is clicked
          >
            <div className="card-body">
              <h2 className="card-title text-2xl">Shop {shop.shopNo}</h2>
              <p className="text-lg">{shop.description}</p>
              <p className="text-sm text-gray-500">Price Range: {shop.priceRange}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show modal only if it's open */}
      {isModalOpen && selectedShop && (
        <ShopModal
          isOpen={isModalOpen}
          onClose={closeModal}
          description={selectedShop.description}
        />
      )}

      <Footer />
    </div>
  );
};

export default Shops;
