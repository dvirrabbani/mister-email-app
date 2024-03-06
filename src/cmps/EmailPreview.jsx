import {
  MdOutlineStarBorder as FavoriteIcon,
  MdDelete as DeleteIcon,
  MdMarkunread as UnReadIcon,
  MdOutlineMarkEmailRead as ReadIcon,
} from 'react-icons/md';

export function EmailPreview({ email }) {
  return (
    <li className={`email-preview${email.isRead ? ' email-status-read' : ''}`}>
      <span className="email-title">{email.from}</span>
      <span className="email-content">
        {email.body} {email.subject}
      </span>
      <div className="email-actions">
        <FavoriteIcon />
        {email.isRead ? <ReadIcon /> : <UnReadIcon />}
        <DeleteIcon />
      </div>
    </li>
  );
}
