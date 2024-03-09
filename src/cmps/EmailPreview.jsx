import { Link, useParams } from 'react-router-dom';
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
  const params = useParams();

  function onClickEmailActions(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  return (
    <Link
      to={`/email/${params.folder}/${email.id}`}
      className={`email-preview${email.isRead ? ' email-status-read' : ''}`}
    >
      <span className="email-title">{email.from}</span>
      <span className="email-content">
        {email.subject} {email.body}
      </span>
      <div className="email-actions" onClick={onClickEmailActions}>
        <button
          onClick={() => {
            onChangeEmailStarred(email);
          }}
        >
          {email.isStarred ? <StarIconIcon /> : <StarIconOutlineIcon />}
        </button>
        <button onClick={() => onChangeEmailRead(email)}>
          {email.isRead ? <ReadIcon /> : <UnReadIcon />}
        </button>
        <button onClick={() => onRemoveEmail(email.id)}>
          <DeleteIcon />
        </button>
      </div>
    </Link>
  );
}
