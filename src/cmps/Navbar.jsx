import { NavLink } from 'react-router-dom';
import {
  MdAllInbox as InboxIcon,
  MdOutlineStarBorder as StarIcon,
  MdOutlineForwardToInbox as SentIcon,
} from 'react-icons/md';

export default function Navbar() {
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

  return (
    <nav className="navbar">
      <ul>
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
