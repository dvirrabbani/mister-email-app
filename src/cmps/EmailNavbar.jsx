import { NavLink, useSearchParams } from 'react-router-dom';
import {
  MdAllInbox as InboxIcon,
  MdOutlineStarBorder as StarIcon,
  MdOutlineForwardToInbox as SentIcon,
} from 'react-icons/md';
import { BsPen as PenIcon } from 'react-icons/bs';

export function EmailNavbar() {
  const [, setSearchParams] = useSearchParams();
  const emailFolders = [
    {
      label: 'Inbox',
      icon: <InboxIcon />,
      toUrl: '/email/inbox',
    },
    {
      label: 'Starred',
      icon: <StarIcon />,
      toUrl: '/email/starred',
    },
    {
      label: 'Sent',
      icon: <SentIcon />,
      toUrl: '/email/sent',
    },
  ];

  function onComposeEmail() {
    setSearchParams((prev) => ({ ...prev, compose: 'new' }));
  }

  return (
    <nav className="email-navbar">
      <ul>
        <div className="navbar-compose-btn-wrapper">
          <button onClick={onComposeEmail}>
            <PenIcon />
          </button>
        </div>
        {emailFolders.map((emailFolder) => {
          return (
            <NavLink
              className="navbar-link-item"
              to={emailFolder.toUrl}
              key={emailFolder.label}
            >
              {emailFolder.icon}
              {emailFolder.label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
