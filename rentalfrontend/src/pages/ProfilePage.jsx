import React from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const userPhoto = "https://via.placeholder.com/150";
  const userName = "John Doe";
  const rentedItems = [
    { id: 1, name: "Item 1", rentedOn: "01/01/2022" },
    { id: 2, name: "Item 2", rentedOn: "02/02/2022" },
    { id: 3, name: "Item 3", rentedOn: "03/03/2022" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-12">
          <img
            className="h-32 w-32 rounded-full object-cover"
            src={userPhoto}
            alt="User's profile photo"
          />
          <h1 className="text-3xl font-bold mt-4">{userName}</h1>
        </div>
        <div className="py-8">
          <h2 className="text-xl font-bold mb-4">Rented Items:</h2>
          <ul className="list-disc pl-8">
            {rentedItems.map((item) => (
              <li key={item.id}>
                {item.name} - Rented on {item.rentedOn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
