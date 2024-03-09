import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { emailService } from '../services/email.service';
import { EmailIndexHeader } from '../cmps/EmailIndexHeader';
import EmailNavbar from '../cmps/EmailNavbar';

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(emailService.sentizeFilterBy(filterBy));
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    setFilterBy((filterBy) => ({ ...filterBy, folder: params.folder }));
  }, [params.folder]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
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

  const { body } = filterBy;
  if (!emails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <EmailIndexHeader filterBy={{ body }} onSetFilter={onSetFilter} />
      <EmailNavbar />
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
      </main>
      <aside className="addon-list-container"></aside>
    </section>
  );
}
