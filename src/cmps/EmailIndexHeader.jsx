import { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

import logoImgUrl from '../assets/imgs/logo_gmail.png';

export function EmailIndexHeader({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  function handleChange(ev) {
    let { value, name: field } = ev.target;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <header className="email-index-header">
      <menu className="menu">
        <MenuIcon className="menu-icon" />
      </menu>
      <img src={logoImgUrl} alt="" />
      <form className="search-bar" onSubmit={onSubmitFilter}>
        <button className="flex align-center">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Search mail"
          name="txt"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />
      </form>
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
