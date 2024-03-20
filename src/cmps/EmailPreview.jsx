import { Link, useParams } from "react-router-dom";

export function EmailPreview({ email }) {
  const params = useParams();

  function genLinkUrl() {
    switch (params.folder) {
      case "drafts":
        return `/email/${params.folder}?compose=${genEmailComposeParams()}`;
      default:
        return `/email/${params.folder}/${email.id}`;
    }
  }

  function genEmailComposeParams() {
    const { id, to, subject, body } = email;
    const composeParams = [id, to, subject, body];
    return composeParams.toString();
  }

  return (
    <Link to={genLinkUrl()} className={"email-preview"}>
      <span className="email-title">{email.from}</span>
      <span className="email-content">
        {email.subject} {email.body}
      </span>
    </Link>
  );
}
