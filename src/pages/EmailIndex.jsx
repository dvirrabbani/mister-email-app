import { EmailIndexHeader } from '../cmps/EmailIndexHeader';

export function EmailIndex() {
  return (
    <section className="email-index">
      <EmailIndexHeader />
      <nav className="navbar"></nav>
      <main className="email-index-main"></main>
      <aside className="addon-list-container"></aside>
    </section>
  );
}
