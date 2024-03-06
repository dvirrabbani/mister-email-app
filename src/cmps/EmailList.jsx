import { EmailPreview } from './EmailPreview';

export function EmailList({
  emails,
  onRemoveEmail,
  onChangeEmailRead,
  onChangeEmailStarred,
}) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onRemoveEmail={onRemoveEmail}
          onChangeEmailRead={onChangeEmailRead}
          onChangeEmailStarred={onChangeEmailStarred}
        />
      ))}
    </ul>
  );
}
