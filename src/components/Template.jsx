import "./template.css";
import { v1 as uuidv1 } from "uuid";
import { useNavigate } from "react-router-dom";
import plusimage from "../assets/plus.svg";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Template = () => {
  let navigate = useNavigate();
  const createFormHandle = () => {
    const id = uuidv1();
    navigate("/form/" + id);
  };

  return (
    <div className="template">
      <div className="template-head">
        <div className="template-left">
          <span>Start a new form</span>
        </div>
        <div className="template-right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="template-main">
        <div className="template-blank-form" onClick={createFormHandle}>
          <img className="plus-icon" src={plusimage} alt="" />
        </div>
        <span className="title">Blank</span>
      </div>
    </div>
  );
};

export default Template;
