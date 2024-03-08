import { useOutletContext } from 'react-router-dom';
import { EmailListContainer } from '../cmps/EmailListContainer';

export function EmailFolder() {
  const context = useOutletContext();
  const {
    emails,
    filterBy: { isRead },
    onSetFilter,
    onRemoveEmail,
    onUpdateEmail,
  } = context;
  return (
    <EmailListContainer
      emails={emails}
      filterBy={{ isRead }}
      onSetFilter={onSetFilter}
      onRemoveEmail={onRemoveEmail}
      onUpdateEmail={onUpdateEmail}
    />
  );
}
