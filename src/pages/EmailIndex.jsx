import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { emailService } from '../services/email.service';
import { EmailIndexHeader } from '../cmps/EmailIndexHeader';
import { EmailNavbar } from '../cmps/EmailNavbar';
import { AddonList } from '../cmps/AddonList';
import { EmailCompose } from '../cmps/EmailCompose';

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [unreadEmailsCount, setUnreadEmailsCount] = useState({});
  const [composeEmail, setComposeEmail] = useState(
    emailService.getDefaultEmail()
  );
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(emailService.sentizeFilterBy(filterBy));
    loadEmails();
    loadUnreadEmails();
  }, [filterBy]);

  useEffect(() => {
    onSetFilter(emailService.getDefaultFilter());
  }, [params.folder]);

  useEffect(() => {
    onChangeEmailCompose(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (!isComposeOpen) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.delete('compose');
        return prevSearchParams;
      });
    }
  }, [isComposeOpen]);

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

  async function loadUnreadEmails() {
    const unreadEmails = await emailService.getUnreadEmailsCount();
    setUnreadEmailsCount(() => unreadEmails);
  }

  async function onRemoveEmail(emailId) {
    try {
      let emailToRemove = emails.find((email) => email.id === emailId);

      if (params.folder === 'trash') {
        await emailService.remove(emailId);
      } else {
        await emailService.save({
          ...emailToRemove,
          removedAt: new Date().getTime(),
        });
      }

      setEmails((prevEmails) => {
        return prevEmails.filter((currEmail) => currEmail.id !== emailId);
      });
    } catch (err) {
      console.log('Error in Remove email', err);
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

  function onChangeEmailCompose(searchParams) {
    const composeParam = searchParams.get('compose');
    if (composeParam && !composeParam === 'new') {
      const defaultEmail = emailService.getDefaultEmail();
      const composeEmailToUpdate = {};
      for (const [key, value] of Object.entries(defaultEmail)) {
        composeEmailToUpdate[key] = searchParams.get(key) || value;
      }
      setComposeEmail(() => composeEmailToUpdate);
    }
    setEmailComposeVisible(composeParam);
  }

  const { txt } = filterBy;
  if (!emails) return <div>loading...</div>;
  return (
    <section className="email-index">
      <EmailIndexHeader filterBy={{ txt }} onSetFilter={onSetFilter} />
      <EmailNavbar
        setEmailComposeVisible={setEmailComposeVisible}
        unreadEmailsCount={unreadEmailsCount}
      />
      <main className="email-index-content">
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
        {isComposeOpen && (
          <EmailCompose
            loadEmails={loadEmails}
            setEmailComposeVisible={setEmailComposeVisible}
            composeEmail={composeEmail}
          />
        )}
      </main>
      <aside className="email-index-aside">
        <AddonList />
      </aside>
    </section>
  );
}
