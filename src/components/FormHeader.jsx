import "./form.css";
import { useParams } from "react-router-dom";
import { FiStar } from "react-icons/fi";

import { IoMdFolderOpen } from "react-icons/io";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from "@material-ui/core/Avatar";

import formImage from "../assets/google-forms.png";

const FormHeader = () => {
  const param = useParams();

  return (
    <div>
      <div className="form-header">
        <div className="form-header-left">
          <img className="form-image-icon" src={formImage} alt="" />
          <input
            className="form-name"
            type="text"
            placeHolder="Untitled-form"
            value="Untitled Form"
          />
          <IoMdFolderOpen></IoMdFolderOpen>
          <FiStar />
        </div>
        <div className="form-header-right">
          <MoreVertIcon />
          <Avatar className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
