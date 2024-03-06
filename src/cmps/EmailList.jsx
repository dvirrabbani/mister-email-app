import { EmailPreview } from './EmailPreview';

export function EmailList({ emails, onRemoveEmail }) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onRemoveEmail={onRemoveEmail}
        />
      ))}
    </ul>
  );
}
