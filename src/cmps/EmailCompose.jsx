import { useState } from 'react';
import { MdClose as CloseIcon } from 'react-icons/md';
import { emailService } from '../services/email.service';

export function EmailCompose({ setEmailComposeVisible, loadEmails }) {
  const [emailToEdit, setEmailToEdit] = useState(
    emailService.getDefaultEmail()
  );

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
          <footer>
            <button className="submit-btn">Send</button>
          </footer>
        </form>
      </div>
    </div>
  );
}
