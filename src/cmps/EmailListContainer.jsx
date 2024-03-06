import { EmailList } from './EmailList';

export function EmailListContainer({ emails, onRemoveEmail, onUpdateEmail }) {
  function onChangeEmailRead(email) {
    const newEmail = { ...email, isRead: !email.isRead };
    onUpdateEmail(newEmail);
  }

  function onChangeEmailStarred(email) {
    const newEmail = { ...email, isStarred: !email.isStarred };
    onUpdateEmail(newEmail);
  }

  return (
    <div className="email-list-container">
      <header className="email-list-header"></header>
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        onChangeEmailRead={onChangeEmailRead}
        onChangeEmailStarred={onChangeEmailStarred}
      />
    </div>
  );
}
