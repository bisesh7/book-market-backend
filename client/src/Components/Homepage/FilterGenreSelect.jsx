import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterGenreSelect = ({ className, setGenreSelected, genreOptions }) => {
  return (
    <InputGroup className={className}>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <FontAwesomeIcon icon={faFilter} />
        </InputGroupText>
      </InputGroupAddon>
      <Input
        onChange={(e) => {
          setGenreSelected(e.target.value);
        }}
        type="select"
        className="genre-select"
        defaultValue="all-genres"
      >
        {genreOptions}
      </Input>
    </InputGroup>
  );
};

export default FilterGenreSelect;
