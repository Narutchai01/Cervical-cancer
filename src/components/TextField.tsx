import { IParameters } from "@/interfaces/parameter";
import { TextField } from "@mui/material";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  label: string;
  unit: string;
  name: keyof IParameters;
  register: UseFormRegister<{ [key in keyof IParameters]: number | null }>;
  value: number | null;
}

export const TextFieldComponent: FC<TextFieldProps> = (props) => {
  const { label, unit, register, name, value } = props;

  return (
    <div className="p-4">
      <div className="flex items-center gap-x-2">
        <TextField
          type="number"
          id={name.toString()}
          label={label}
          variant="outlined"
          slotProps={{
            inputLabel: {
              shrink: value === null ? false : true,
            },
          }}
          {...register(name, {
            setValueAs: (value) => parseInt(value, 10) || null,
          })}
        />
        <p>{unit}</p>
      </div>
    </div>
  );
};
