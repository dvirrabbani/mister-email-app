import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export function EmailNavbar({ unreadEmailsCount }) {
  const [, setSearchParams] = useSearchParams();
  const [emailFolders, setEmailFolders] = useState([
    {
      key: 'inbox',
      label: 'Inbox',
      icon: <InboxIcon />,
      toUrl: '/email/inbox',
    },
    {
      label: 'Starred',
      icon: <StarBorderIcon />,
      toUrl: '/email/starred',
    },
    {
      label: 'Sent',
      icon: <SendOutlinedIcon />,
      toUrl: '/email/sent',
    },
    {
      label: 'Trash',
      icon: <DeleteOutlineOutlinedIcon />,
      toUrl: '/email/trash',
    },
    {
      key: 'drafts',
      label: 'Drafts',
      icon: <DescriptionOutlinedIcon />,
      toUrl: '/email/drafts',
    },
  ]);

  useEffect(() => {
    if (unreadEmailsCount.inbox) {
      setEmailFolders((prevEmailFolders) =>
        prevEmailFolders.map((folder) => {
          if (unreadEmailsCount[folder.key]) {
            folder.unreadCount = unreadEmailsCount[folder.key];
          }
          return folder;
        })
      );
    }
  }, [unreadEmailsCount]);

  function onComposeEmail() {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set('compose', 'new');
      return prevSearchParams;
    });
  }

  return (
    <nav className="email-navbar">
      <ul>
        <div className="navbar-compose-btn-wrapper">
          <button onClick={onComposeEmail}>
            <span className="navbar-compose-btn-icon-wrapper">
              <CreateOutlinedIcon />
            </span>
            <span>Compose</span>
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
              {emailFolder.unreadCount && (
                <span>{emailFolder.unreadCount}</span>
              )}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
