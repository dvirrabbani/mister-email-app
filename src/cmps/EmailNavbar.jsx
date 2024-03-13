import { NavLink, useSearchParams } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

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
  ];

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
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
