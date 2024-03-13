import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { emailService } from '../services/email.service';

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (err) {
      navigate('/email');
      console.log('Had issues loading email', err);
    }
  }

  if (!email) {
    return <div>...loading</div>;
  }
  return (
    <section className="email-details">
      <Link to={`/email/${params.folder}`}>
        <ArrowBackOutlinedIcon />
      </Link>
      <h3 className="title">{email.subject}</h3>
      <div className="info">
        from:
        <span>
          {'<'}
          {email.from}
          {'>'}
        </span>
        to:
        <span>
          {'<'}
          {email.to}
          {'>'}
        </span>
      </div>
      <div className="email-details-content">
        <p>{email.body}</p>
      </div>
    </section>
  );
}
