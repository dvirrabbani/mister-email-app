import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

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

  function handleChange(ev) {
    let { value, name: field } = ev.target;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
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
    <section className="email-filter">
      <form className="search-bar" onSubmit={onSubmitFilter}>
        <button className="flex align-center">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Search mail"
          name="txt"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />
        <IconButton>
          <TuneIcon />
        </IconButton>
      </form>
    </section>
  );
}
