import { EmailPreview } from './EmailPreview';

export function EmailList({ emails, onRemoveEmail, onChangeEmailRead }) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onRemoveEmail={onRemoveEmail}
          onChangeEmailRead={onChangeEmailRead}
        />
      ))}
    </ul>
  );
}
