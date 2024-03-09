import { NavLink, useSearchParams } from 'react-router-dom';
import {
  MdAllInbox as InboxIcon,
  MdOutlineStarBorder as StarIcon,
  MdOutlineForwardToInbox as SentIcon,
} from 'react-icons/md';
import { BsPen as PenIcon } from 'react-icons/bs';

export function EmailNavbar() {
  const [_, setSearchParams] = useSearchParams();
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
        <button onClick={onComposeEmail}>
          <PenIcon />
          <span>Compose</span>
        </button>
        {emailFolders.map((emailFolder) => {
          return (
            <li key={emailFolder.label}>
              <NavLink to={emailFolder.toUrl}>
                {emailFolder.icon} {emailFolder.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
