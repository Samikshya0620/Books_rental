import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";

import hero from "../assets/face.jpg";
import { useNavigate } from "react-router-dom";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const apiEndpoint = config.apiUrl + "profile";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const { user, authTokens } = useContext(AuthContext);
  const [rentedItems, setRentedItems] = useState([]);

  const navigate = useNavigate();
  const userPhoto = hero;

  useEffect(() => {
    const getRentedItems = async () => {
      try {
        const response = await http.get(apiEndpoint, {
          headers: {
            Authorization: "Bearer " + authTokens.access_token,
          },
        });
        setRentedItems(await response.data);
      } catch (error) {

        toast.error("Something Went Wrong");

      }
    };
    getRentedItems();
  }, [authTokens.access_token]);
  useEffect(() => {
    const urls = rentedItems.map((item) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${item.image_data}`;
      return image.src;
    });

    setImageUrls(urls);
  }, [rentedItems]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-12">
          <img
            className="h-32 w-32 rounded-full object-cover"

            src={hero}
            alt="User's profile photo"
          />
          <h1 className="text-3xl font-bold mt-4">
            {user.firstname + " " + user.lastname}
          </h1>
          <h1 className="text-xl  mt-4">{user.email}</h1>
        </div>
        <div className="py-8">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Rented Items:</h2>

          </div>
          <div className="overflow-x-auto overflow-y-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xs sm:text-xl"></th>
                  <th className="px-4 py-2 text-xs sm:text-xl">Product Name</th>
                  <th className="px-4 py-2 text-xs sm:text-xl">Order Date</th>
                  <th className="px-4 py-2 text-xs sm:text-xl">Quantity</th>
                  <th className="px-4 py-2 text-xs sm:text-xl">Price</th>
                  <th className="px-4 py-2 text-xs sm:text-xl">Total</th>
                  <th className="px-4 py-2 text-xs sm:text-xl">

                    Deadline Date
                  </th>
                  <th className="px-4 py-2 text-xs sm:text-xl">
                    Remaining Days

                  </th>
                </tr>
              </thead>
              <tbody>
                {rentedItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className=" px-4 py-2 text-xs sm:text-sm">
                      <img
                        className="p-1 m-auto"
                        src={imageUrls[index]}
                        alt={item.name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl font-bold">
                      {item.name}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl">
                      {item.order_date}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl">
                      {item.quantity}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl">
                      Rs {item.price}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl">
                      Rs {item.total}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl">

                      {item.deadline_date}
                    </td>
                    <td className=" px-4 py-2 text-xs sm:text-xl ">
                      {item.remaining_days}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
