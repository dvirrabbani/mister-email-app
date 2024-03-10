export function EmailFilter({ filterBy, onSetFilter }) {
  function handleChangeIsRead(ev) {
    let { value } = ev.target;

    let isRead = null;
    switch (value) {
      case 'read':
        isRead = true;
        break;
      case 'unread':
        isRead = false;
        break;
    }
    onSetFilter({ isRead });
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  function mapIsReadToOptionValue(value) {
    switch (value) {
      case true:
        return 'read';
      case false:
        return 'unread';
      case null:
        return '';
    }
  }

  return (
    <form onSubmit={onSubmitFilter}>
      <select
        value={mapIsReadToOptionValue(filterBy.isRead)}
        name="isRead"
        onChange={handleChangeIsRead}
      >
        <option value="">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </form>
  );
}
