import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import DraftsIcon from '@mui/icons-material/Drafts';

import { EmailPreview } from './EmailPreview';

export function EmailList({ emails, onUpdateEmail, onRemoveEmail }) {
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
              {email.isStarred ? <StarIcon /> : <StarBorderIcon />}
            </button>
            <button onClick={() => onChangeEmailRead(email)}>
              {email.isRead ? <MarkEmailUnreadIcon /> : <DraftsIcon />}
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
