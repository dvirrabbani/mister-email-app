import { useEffect, useState } from 'react';
import { emailService } from '../services/email.service';
import { EmailIndexHeader } from '../cmps/EmailIndexHeader';
import { EmailListContainer } from '../cmps/EmailListContainer';

export function EmailIndex() {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const emails = await emailService.query();
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

  if (!emails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <EmailIndexHeader />
      <nav className="navbar"></nav>
      <main className="email-index-main">
        <EmailListContainer
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onUpdateEmail={onUpdateEmail}
        />
      </main>
      <aside className="addon-list-container"></aside>
    </section>
  );
}
