import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

const FilterGenreSelect = ({ className, setGenreSelected, genres }) => {
  const options = genres.map((genre) => {
    if (genre === "(no genres listed)")
      return { value: "Others", label: "Others" };
    else return { value: genre, label: genre };
  });

  return (
    <InputGroup className={className}>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <FontAwesomeIcon icon={faFilter} />
        </InputGroupText>
      </InputGroupAddon>
      <Select
        className="genre-select"
        options={options}
        isClearable
        onChange={(option) => {
          if (option) {
            setGenreSelected(option.value);
          } else {
            setGenreSelected("all-genres");
          }
        }}
      />
    </InputGroup>
  );
};

export default FilterGenreSelect;
