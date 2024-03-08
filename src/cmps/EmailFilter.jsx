import { useEffect, useState } from 'react';

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChangeIsRead(ev) {
    let { value } = ev.target;

    let filterValue = null;
    switch (value) {
      case 'read':
        filterValue = true;
        break;
      case 'unread':
        filterValue = false;
        break;
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: filterValue }));
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
        value={mapIsReadToOptionValue(filterByToEdit.isRead)}
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
