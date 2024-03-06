import {
  MdOutlineStarBorder as StarIconOutlineIcon,
  MdOutlineStar as StarIconIcon,
  MdDelete as DeleteIcon,
  MdMarkunread as UnReadIcon,
  MdOutlineMarkEmailRead as ReadIcon,
} from 'react-icons/md';

export function EmailPreview({
  email,
  onRemoveEmail,
  onChangeEmailRead,
  onChangeEmailStarred,
}) {
  return (
    <li className={`email-preview${email.isRead ? ' email-status-read' : ''}`}>
      <span className="email-title">{email.from}</span>
      <span className="email-content">
        {email.subject} {email.body}
      </span>
      <div className="email-actions">
        <button onClick={() => onChangeEmailStarred(email)}>
          {email.isStarred ? <StarIconIcon /> : <StarIconOutlineIcon />}
        </button>
        <button onClick={() => onChangeEmailRead(email)}>
          {email.isRead ? <ReadIcon /> : <UnReadIcon />}
        </button>
        <button onClick={() => onRemoveEmail(email.id)}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
