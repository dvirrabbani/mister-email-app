import { Link, useParams } from 'react-router-dom';

export function EmailPreview({ email }) {
  const params = useParams();

  return (
    <Link
      to={`/email/${params.folder}/${email.id}`}
      className={'email-preview'}
    >
      <span className="email-title">{email.from}</span>
      <span className="email-content">
        {email.subject} {email.body}
      </span>
    </Link>
  );
}
