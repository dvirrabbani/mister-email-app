import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { BsFillQuestionCircleFill as SupportIcon } from 'react-icons/bs';
import { BsGearFill as SettingIcon } from 'react-icons/bs';
import { BsFillGrid3X3GapFill as GridIcon } from 'react-icons/bs';
import { MdMenu as MenuIcon } from 'react-icons/md';

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
          <SupportIcon />
        </button>
        <button>
          <SettingIcon />
        </button>
        <button>
          <GridIcon />
        </button>
        <Link to={'#'} className="profile-logo">
          <span>D</span>
        </Link>
      </div>
    </header>
  );
}
