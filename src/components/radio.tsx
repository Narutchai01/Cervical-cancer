import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FC } from "react";

interface RadioProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // value: { label: string; value: number }[];
}

export const RadioComponent: FC<RadioProps> = (props) => {
  const { label, name, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        onChange={onChange}
      >
        <FormControlLabel value={1} control={<Radio />} label="ใช่" />
        <FormControlLabel value={0} control={<Radio />} label="ไม่" />
      </RadioGroup>
    </FormControl>
  );
};
