import React, { useEffect, useState } from "react";
import { GoBack } from "../Components/GoBack";
import { auth } from "../Service/Service";

export const SiteData: React.FC = () => {
  const [data, setData] = useState<{
    totalSells: number;
    totalRegisteredCars: number;
    totalRegisteredUsers: number;
  }>({ totalSells: 1, totalRegisteredCars: 2, totalRegisteredUsers: 2 });
  useEffect(() => {
    auth.getSiteData(setData);
  }, []);
  return (
    <div className="cart-page">
      <GoBack />
      <strong className="cart-page__heading">Website Data</strong>
      <div className="product-card m-t-32 width-80 p-a-12">
        <h1>
          Total Sells: {data.totalSells} <br />
          <br />
          Total Registered Users : {data.totalRegisteredUsers} <br />
          <br />
          Total Registered Cars: {data.totalRegisteredCars}
        </h1>
      </div>
    </div>
  );
};
