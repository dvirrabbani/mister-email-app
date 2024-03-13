import {
  MdOutlineStarBorder as StarIconOutlineIcon,
  MdOutlineStar as StarIconIcon,
  MdDelete as DeleteIcon,
  MdMarkunread as UnReadIcon,
  MdOutlineMarkEmailRead as ReadIcon,
} from 'react-icons/md';

import { EmailPreview } from './EmailPreview';

export function EmailList({ emails, onUpdateEmail }) {
  function onChangeEmailRead(email) {
    const newEmail = { ...email, isRead: !email.isRead };
    onUpdateEmail(newEmail);
  }

  function onChangeEmailStarred(email) {
    const newEmail = { ...email, isStarred: !email.isStarred };
    onUpdateEmail(newEmail);
  }

  return (
    <ul className="email-list">
      {emails.map((email) => (
        <li
          key={email.id}
          className={`email-item ${email.isRead ? 'status-read' : ''}`}
        >
          <EmailPreview key={email.id} email={email} />
          <div className="actions-buttons">
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
        </li>
      ))}
    </ul>
  );
}
