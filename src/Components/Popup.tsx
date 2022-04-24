import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PopupModel } from "../Models/ComponentModels";

export const Popup: React.FC<PopupModel> = (props) => {
  const { open, handleClose, data, heading } = props;
  return (
    <div className={open ? "popup" : "display-none"}>
      <div className="popup__window">
        <div className="df-ac-jb p-t-24 p-lr-24">
          <span className="ft-sz-24 ft-wt-500 lt-sp-2">{heading}</span>
          <CloseRoundedIcon
            className="cursor-pointer on-hover-black"
            onClick={handleClose}
          />
        </div>
        <hr className="hr" />
        <div>{data}</div>
      </div>
    </div>
  );
};
