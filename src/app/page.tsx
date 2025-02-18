"use client";
import { Idata } from "@/interfaces/data";
import { useState } from "react";

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

  const lft_ca125 = (
    Menopausal: number,
    Albumin: number,
    Globulin: number,
    CA125: number
  ) => {
    const w =
      -1.369 +
      0.536 * Menopausal -
      0.556 * Albumin +
      0.565 * Globulin +
      0.003 * CA125;

    return Math.exp(w) / (1 + Math.exp(w));
  };

  console.log("สูตร 1 ", cbc_us_ca125(1, 247, 1, 1, 1, 43.9).toFixed(4));
  console.log("สูตร 2 ", us_ca125(1, 1, 1, 1, 43.9).toFixed(4));
  console.log("สูตร 3 ", cbc_us(1, 247, 1, 1, 1).toFixed(4));
  console.log("สูตร 4 ", us(1, 1, 1, 1, 1).toFixed(4));
  console.log("สูตร 5 ", lft_ca125(1, 4.6, 3.7, 43.9).toFixed(4));

  return (
    <div>
      <form>
        <input
          type="number"
          placeholder="albuin"
          name="albuin"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="platelets"
          name="platelets"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="globulin"
          name="globulin"
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="globulin"
          name="globulin"
          onChange={onChange}
        />
      </form>
    </div>
  );
}
