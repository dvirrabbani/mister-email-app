import { useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { emailService } from '../services/email.service';
import { useEffectUpdate } from '../customHooks/useEffectUpdate';

export function EmailCompose({
  composeEmail,
  setEmailComposeVisible,
  loadEmails,
}) {
  const [emailToEdit, setEmailToEdit] = useState(
    composeEmail || emailService.getDefaultEmail()
  );

  const draftTimeoutRef = useRef();
  const savedToDraftDuration = 5000;

  useEffectUpdate(() => {
    if (!emailToEdit.id) {
      draftTimeoutRef.current = setInterval(() => {
        handleEmailComposeChange(emailToEdit);
        loadEmails();
      }, savedToDraftDuration);
    }

    return () => {
      clearInterval(draftTimeoutRef.current);
    };
  }, [emailToEdit]);

  async function handleEmailComposeChange(emailToEdit) {
    const draft = await emailService.saveDraft(emailToEdit);
    setEmailToEdit(draft);
  }

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
      await emailService.send(emailToEdit);
      onCloseCompose();
      showSuccessMsg('Email Sent successfully');
      loadEmails();
    } catch (error) {
      console.log('Had Some issue saving email', emailToEdit);
    }
  }

  function onCloseCompose() {
    setEmailComposeVisible(false);
  }

  return (
    <div className="email-compose-container">
      <div className="email-compose">
        <header className="email-compose-header">
          <h3>New Message</h3>
          <button onClick={onCloseCompose}>
            <CloseIcon />
          </button>
        </header>
        <form className="email-compose-form" onSubmit={onSaveEmail}>
          <input
            onChange={handleChange}
            name="to"
            type="email"
            placeholder="To"
            value={emailToEdit.to}
          />
          <input
            onChange={handleChange}
            name="subject"
            type="text"
            placeholder="Subject"
            value={emailToEdit.subject}
          />
          <textarea
            onChange={handleChange}
            name="body"
            type="text"
            placeholder="Content"
            value={emailToEdit.body}
          />
          <footer>
            <button className="submit-btn">Send</button>
          </footer>
        </form>
      </div>
    </div>
  );
}
