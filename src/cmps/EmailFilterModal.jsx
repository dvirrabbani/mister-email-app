import { useState } from "react";
import { Button } from "@mui/material";

export function EmailFilterModal({
  filterBy,
  onSetFilter,
  setShowFilterModal,
}) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  function handleChangeIsRead(ev) {
    let { value } = ev.target;

    let isRead = null;
    switch (value) {
      case "read":
        isRead = true;
        break;
      case "unread":
        isRead = false;
        break;
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, isRead }));
  }

  function mapIsReadToOptionValue(value) {
    switch (value) {
      case true:
        return "read";
      case false:
        return "unread";
      case null:
        return "";
    }
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
    setShowFilterModal(false);
  }

  return (
    <div className="email-filter-modal">
      <form className="email-filter-modal_form" onSubmit={onSubmitFilter}>
        <div className="form-item">
          <label htmlFor="isRead">Read</label>
          <select
            value={mapIsReadToOptionValue(filterByToEdit.isRead)}
            name="isRead"
            onChange={handleChangeIsRead}
          >
            <option value="">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>
        <div className="form-item">
          <Button type="submit" variant="contained">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
