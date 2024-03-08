import { EmailFilter } from './EmailFilter';
import { EmailList } from './EmailList';

export function EmailListContainer({
  emails,
  onRemoveEmail,
  onUpdateEmail,
  filterBy,
  onSetFilter,
}) {
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
      <header className="email-list-header">
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      </header>
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        onChangeEmailRead={onChangeEmailRead}
        onChangeEmailStarred={onChangeEmailStarred}
      />
    </div>
  );
}
