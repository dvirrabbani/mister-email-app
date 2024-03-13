import { useOutletContext } from 'react-router-dom';
import { EmailFilter } from '../cmps/EmailFilter';
import { EmailList } from '../cmps/EmailList';

export function EmailFolder() {
  const context = useOutletContext();
  const { emails, filterBy, onSetFilter, onUpdateEmail, onRemoveEmail } =
    context;

  return (
    <div className="email-folder">
      <header className="email-folder-header">
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      </header>
      <EmailList
        emails={emails}
        onUpdateEmail={onUpdateEmail}
        onRemoveEmail={onRemoveEmail}
      />
    </div>
  );
}
