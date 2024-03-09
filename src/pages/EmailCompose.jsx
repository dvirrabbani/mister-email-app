import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { emailService } from '../services/email.service';

export function EmailCompose({ loadEmails }) {
  const [searchParams] = useSearchParams();
  const [showCompose, setShowCompose] = useState(false);
  const [emailToEdit, setEmailToEdit] = useState(
    emailService.getDefaultEmail()
  );

  useEffect(() => {
    const composeParam = searchParams.get('compose');
    if (composeParam === 'new') {
      setShowCompose(true);
    }
  }, [searchParams]);

  function handleChange(ev) {
    let { value, name: field } = ev.target;
    setEmailToEdit((prevEmailToEdit) => ({
      ...prevEmailToEdit,
      [field]: value,
    }));
  }

  async function onSaveEmail(ev) {
    try {
      ev.preventDefault();
      await emailService.save(emailToEdit);
      loadEmails();
    } catch (error) {
      console.log('Had Some issue saving email', emailToEdit);
    }
  }

  if (!showCompose) return null;
  return (
    <div className="email-compose-container">
      <div className="email-compose">
        <header className="email-compose-header">
          <h3>New Message</h3>
        </header>
        <form className="email-compose-form" onSubmit={onSaveEmail}>
          <input
            onChange={handleChange}
            name="to"
            type="email"
            placeholder="To"
          />
          <input
            onChange={handleChange}
            name="subject"
            type="text"
            placeholder="Subject"
          />
          <textarea
            onChange={handleChange}
            name="body"
            type="text"
            placeholder="Content"
          />
          <button className="submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
}
