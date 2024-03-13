import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import DraftsIcon from '@mui/icons-material/Drafts';
import { IconButton } from '@mui/material';

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
          <IconButton
            onClick={() => {
              onChangeEmailStarred(email);
            }}
          >
            {email.isStarred ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <EmailPreview key={email.id} email={email} />
          <div className="actions-buttons">
            <IconButton onClick={() => onChangeEmailRead(email)}>
              {email.isRead ? <MarkEmailUnreadIcon /> : <DraftsIcon />}
            </IconButton>
            <IconButton onClick={() => onRemoveEmail(email.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
