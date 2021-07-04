import React from "react";
import "./styles.css";
import Header from "../../common/Header";
import successImg from "../../../assets/images/success.png";
import accept from "../../../assets/images/approve.png";

const Success = () => {
  return (
    <div className="flight-container">
      <Header />
      <div className="success-wrapper">
        <div className="bold-text">congratulations!!</div>
        <div className="image-wrapper">
          <img src={successImg} alt="success" />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <div className="accept-img">
            <img src={accept} alt="accept" />
          </div>
          <div className="text-lg">booking confirmed</div>
        </div>
        <div className="text-md">
          Your flight from <span>DEL - LHR</span> on <span>10 April 2021</span>
          is confirmed
        </div>
        <div className="custom-btn">
        </div>
      </div>
    </div>
  );
};
export default Success;