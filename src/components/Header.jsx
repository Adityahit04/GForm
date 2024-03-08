import "./header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import formImage from "../assets/google-forms.png";
import AppsIcon from '@mui/icons-material/Apps';
import Avatar from "@material-ui/core/Avatar";

const Header = () => {
  return (
    <div className="header">
      <div className="header-info">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img className="form-image" src={formImage} alt="" />
        <span className="info">Forms</span>
      </div>
      <div className="header-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" className="info" />
      </div>

      <div className="header-right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
