import { EmailList } from './EmailList';

export function EmailListContainer({ emails }) {
  return (
    <div className="email-list-container">
      <header className="email-list-header"></header>
      <EmailList emails={emails} />
    </div>
  );
}
