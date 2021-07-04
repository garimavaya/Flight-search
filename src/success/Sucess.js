import React, { useContext } from "react";
import { appContext } from "../appContext/AppProvider";
import Header from "../Header /Header";
import "./styles.css";
// import successImg from "./success.png";
// import accept from "./approve.png";

const Success = () => {
  const { bookingInfo } = useContext(appContext);
  return (
    <div className="flight-container">
      <Header />
      <div className="success-wrapper">
        <div className="bold-text">congratulations!!</div>
        <div className="image-wrapper">
          {/* <img src={successImg} alt="success" /> */}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <div className="accept-img">
            {/* <img src={accept} alt="accept" /> */}
          </div>
          <div className="text-lg">booking confirmed</div>
        </div>
        <div className="text-md">
          Your flight from{" "}
          <span>{`${bookingInfo.from} - ${bookingInfo.to}`}</span> on{" "}
          <span>{bookingInfo.date}</span>
          is confirmed
        </div>
        <div className="custom-btn"></div>
      </div>
    </div>
  );
};
export default Success;
