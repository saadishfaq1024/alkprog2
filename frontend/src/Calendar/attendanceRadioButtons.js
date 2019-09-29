import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function FormControlLabelPosition() {
  const [value, setValue] = React.useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="present"
          control={<Radio color="primary" />}
          label="Present"
          labelPlacement="present"
        />
        <FormControlLabel
          value="end"
          control={<Radio color="primary" />}
          label="Absent"
          labelPlacement="end"
        />
        <FormControlLabel
          value="canceled"
          control={<Radio color="primary" />}
          label="Canceled"
          labelPlacement="canceled"
        />
      </RadioGroup>
    </FormControl>
  );
}
