"use client";

import { useAnalysis } from "@/context/analysisContext";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import { labelTextField, labelRadio } from "@/data/analysis";
import { RadioComponent } from "@/components/radio";
import Link from "next/link";

export default function Home() {
  const { setParameter, parameter } = useAnalysis();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParameter({
      ...parameter,
      [name]: parseFloat(value),
    });
  };

  const check = [
    parameter["platelets"],
    parameter["albumin"],
    parameter["globulin"],
    parameter["ca_125"],
    parameter["menopausal_status"],
    parameter["solid"],
    parameter["papillary_projection"],
    parameter["cyst_wall"],
    parameter["septum"]
  ];


  const checkValue = () => {
    return check.filter(value => value != null).length;
  };


  console.log(checkValue() < 3 );
  

  return (
    <div className="p-4">
      <div className="container mx-auto px-4 md:px-16 lg:px-64">
        <form className="flex flex-col gap-4">
          {labelTextField.map((textField, index: number) => {
            return (
              <TextField
                key={index}
                variant="outlined"
                className="w-full"
                name={textField.name}
                label={textField.label}
                type="number"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        {textField.unit}
                      </InputAdornment>
                    ),
                  },
                  inputLabel: { shrink: check[index] != null ? true : false },
                }}
              />
            );
          })}

          <div className="flex flex-col gap-4">
            {labelRadio.map((radio, index: number) => (
              <RadioComponent
                key={index}
                label={radio.label}
                name={radio.name}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="p-4 items-center justify-center flex">
            <Link href="/analysis">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                วิเคราะห์ผล
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
