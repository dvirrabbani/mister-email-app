import { Link } from 'react-router-dom';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { EmailFilter } from './EmailFilter';

import logoImgUrl from '../assets/imgs/logo_gmail.png';

export function EmailIndexHeader({ filterBy, onSetFilter }) {
  return (
    <header className="email-index-header">
      <menu className="menu">
        <IconButton>
          <MenuIcon className="menu-icon" />
        </IconButton>
        <Link to={'/email/inbox'}>
          <img src={logoImgUrl} alt="" />
        </Link>
      </menu>
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />

      <div className="user-preferences-bar">
        <button>
          <HelpOutlineIcon />
        </button>
        <button>
          <SettingsIcon />
        </button>
        <button>
          <AppsIcon />
        </button>
        <Link to={'#'} className="profile-logo">
          <span>D</span>
        </Link>
      </div>
    </header>
  );
}
