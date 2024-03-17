import { useOutletContext } from 'react-router-dom';
import { EmailList } from '../cmps/EmailList';

export function EmailFolder() {
  const context = useOutletContext();
  const { emails, onUpdateEmail, onRemoveEmail } = context;

  return (
    <div className="email-folder">
      <header className="email-folder-header"></header>
      <EmailList
        emails={emails}
        onUpdateEmail={onUpdateEmail}
        onRemoveEmail={onRemoveEmail}
      />
    </div>
  );
}
