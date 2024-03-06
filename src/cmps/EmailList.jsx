import {
  MdOutlineStarBorder as FavoriteIcon,
  MdDelete as DeleteIcon,
  MdMarkunread as UnReadIcon,
  MdOutlineMarkEmailRead as ReadIcon,
} from 'react-icons/md';

export function EmailList({ emails }) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id} className="flex align-center">
          <span className="email-title">{email.from}</span>
          <span className="email-content">
            {email.body} {email.subject}
          </span>
          <div className="email-actions flex align-center">
            <FavoriteIcon />
            {email.isRead ? <ReadIcon /> : <UnReadIcon />}
            <DeleteIcon />
          </div>
        </li>
      ))}
    </ul>
  );
}
