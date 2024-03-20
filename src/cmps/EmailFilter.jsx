import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { EmailFilterModal } from "./EmailFilterModal";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [showFilterModal, setShowFilterModal] = useState(false);

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  function handleChange(ev) {
    let { value, name: field } = ev.target;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
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
        <IconButton
          onClick={() =>
            setShowFilterModal((prevShowFilterModal) => !prevShowFilterModal)
          }
        >
          <TuneIcon />
        </IconButton>
      </form>
      {showFilterModal && (
        <EmailFilterModal
          filterBy={filterBy}
          onSetFilter={onSetFilter}
          setShowFilterModal={setShowFilterModal}
        />
      )}
    </section>
  );
}
