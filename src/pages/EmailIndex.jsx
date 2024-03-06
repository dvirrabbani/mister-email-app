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

  if (!emails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <EmailIndexHeader />
      <nav className="navbar"></nav>
      <main className="email-index-main">
        <EmailListContainer emails={emails} />
      </main>
      <aside className="addon-list-container"></aside>
    </section>
  );
}
