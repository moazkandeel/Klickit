import React from 'react';
import slider1 from "../../Assets/404-error-page-not-found-plug.jpg";
export default function NotFound() {
  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-dark">
        <div className="text-center">
        <img src={slider1} height={450} className="w-100 apo " alt="" />
          <h1 className="text-light mt-4">404 - Page Not Found</h1>
        </div>
      </div>
    </>
  );
}
