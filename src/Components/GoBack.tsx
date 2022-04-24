import React from "react";
import { useNavigate } from "react-router-dom";

export const GoBack: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="goback">
      <button className="goback__txt" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};
