import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { emailService } from '../services/email.service';
import { EmailIndexHeader } from '../cmps/EmailIndexHeader';
import { EmailNavbar } from '../cmps/EmailNavbar';
import { EmailCompose } from './EmailCompose';

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );
  useEffect(() => {
    setSearchParams(emailService.sentizeFilterBy(filterBy));
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    onSetFilter(emailService.getDefaultFilter());
  }, [params.folder]);

  async function loadEmails() {
    try {
      const emails = await emailService.query({
        ...filterBy,
        folder: params.folder,
      });
      setEmails(emails);
    } catch (error) {
      console.log('Error in load emails', error);
    }
  }

  async function onRemoveEmail(emailId) {
    console.log('remove');
    try {
      await emailService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((currEmail) => currEmail.id !== emailId)
      );
    } catch (err) {
      console.log('Error in update email', err);
    }
  }

  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      setEmails((prevEmails) =>
        prevEmails.map((currEmail) =>
          currEmail.id === updatedEmail.id ? updatedEmail : currEmail
        )
      );
    } catch (err) {
      console.log('Error in update email', err);
    }
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
  }

  function setEmailComposeVisible(value) {
    setIsComposeOpen(() => value);
  }

  const { body } = filterBy;
  if (!emails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <EmailIndexHeader filterBy={{ body }} onSetFilter={onSetFilter} />
      <EmailNavbar setEmailComposeVisible={setEmailComposeVisible} />
      <main className="email-index-main">
        <Outlet
          context={{
            emails,
            filterBy,
            onSetFilter,
            onRemoveEmail,
            onUpdateEmail,
            params,
          }}
        />
        <EmailCompose
          loadEmails={loadEmails}
          isComposeOpen={isComposeOpen}
          setEmailComposeVisible={setEmailComposeVisible}
        />
      </main>
      <aside className="addon-list-container"></aside>
    </section>
  );
}
