"use client";
import { Idata } from "@/interfaces/data";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function Home() {
  const [input, setInput] = useState<Idata>({
    menopausal_status: null,
    platelets: null,
    albumin: null,
    globulin: null,
    diameter_of_ovary: null,
    solid: null,
    papillary_projection: null,
    cyst_wall: null,
    septum: null,
    ascites: null,
    ca_125: null,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const cbc_us_ca125 = (
    Menopausal: number,
    P: number,
    Solid: number,
    Papillary: number,
    Septum: number,
    CA125: number
  ): number => {
    const w =
      -6.527 +
      0.874 * Menopausal +
      0.008 * P +
      1.484 * Solid +
      2.446 * Papillary +
      1.389 * Septum +
      0.002 * CA125;

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const us_ca125 = (
    Menopausal: number,
    Solid: number,
    Papillary: number,
    Septum: number,
    CA125: number
  ) => {
    const w =
      -4.06 +
      0.749 * Menopausal +
      1.832 * Solid +
      2.14 * Papillary +
      1.173 * Septum +
      0.003 * CA125;

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const cbc_us = (
    Menopausal: number,
    P: number,
    Solid: number,
    Papillary: number,
    Septum: number
  ) => {
    const w =
      -7.316 +
      1.263 * Menopausal +
      0.009 * P +
      2.219 * Solid +
      2.541 * Papillary +
      1.313 * Septum;

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const us = (
    Menopausal: number,
    Solid: number,
    Papillary: number,
    Cystwall: number,
    Septum: number
  ) => {
    const w =
      -4.308 +
      0.864 * Menopausal +
      2.073 * Solid +
      1.939 * Papillary +
      1.172 * Cystwall +
      1.099 * Septum;
    return Math.exp(w) / (1 + Math.exp(w));
  };

  const lft_ca125_2 = (
    Menopausal: number,
    Albumin: number,
    Globulin: number,
    CA125: number
  ) => {
    const w =
      -2.783 +
     ( 0.8 * Menopausal) +
      (0.256 * Globulin) +
      (0.003 * CA125);

    return Math.exp(w) / (1 + Math.exp(w));
  };

  // console.log("สูตร 1 ", cbc_us_ca125(1, 471, 1, 1, 0, 3988));
  // console.log("สูตร 2 ", us_ca125(1, 1, 1, 0, 3988));
  // console.log("สูตร 3 ", cbc_us(1, 471, 1, 1, 0));
  // console.log("สูตร 4 ", us(1, 1, 1, 1, 0));
  // console.log("สูตร 5 ", lft_ca125(1, 2.9, 3.1, 3988));
  console.log("_____________________________________");
  console.log("สูตร 1 ", cbc_us_ca125(1,493,1,0,0,751));
  console.log("สูตร 2 ", us_ca125(1,1,0,0,751));
  console.log("สูตร 3 ", cbc_us(1,493,1,0,0));
  console.log("สูตร 4 ", us(1,1,0,1,0));
  console.log("สูตร 5 ", lft_ca125_2(1,3.1,4.4,751));

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
