import { Link } from 'react-router-dom';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { BsFillQuestionCircleFill as SupportIcon } from 'react-icons/bs';
import { BsGearFill as SettingIcon } from 'react-icons/bs';
import { BsFillGrid3X3GapFill as GridIcon } from 'react-icons/bs';
import { MdMenu as MenuIcon } from 'react-icons/md';

import logoImgUrl from '../assets/imgs/logo_gmail.png';

export function EmailIndexHeader() {
  return (
    <header className="email-index-header">
      <menu className="menu">
        <MenuIcon className="menu-icon" />
      </menu>
      <img src={logoImgUrl} alt="" />
      <form className="search-bar">
        <button className="flex align-center">
          <SearchIcon />
        </button>
        <input type="text" placeholder="Search mail" />
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
