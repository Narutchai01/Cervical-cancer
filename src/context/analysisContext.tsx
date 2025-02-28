"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IParameters } from "@/interfaces/parameter";

type AnalysisContextType = {
  parameter: IParameters;
  setParameter: (value: IParameters) => void;
  cbc_us_ca125: (
    Menopausal: number | null,
    P: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null,
    CA125: number | null
  ) => number;
  us_ca125: (
    Menopausal: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null,
    CA125: number | null
  ) => number;
  cbc_us: (
    Menopausal: number | null,
    P: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null
  ) => number;
  us: (
    Menopausal: number | null,
    Solid: number | null,
    Papillary: number | null,
    CystWall: number | null,
    Septum: number | null
  ) => number;
  lft_ca125: (
    Menopausal: number | null,
    Albumin: number | null,
    Globulin: number | null,
    CA125: number | null
  ) => number;
  chartResult: number[];
  result: () => number;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within a AnalysisProvider");
  }
  return context;
};

export const AnalysisProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [parameter, setParameter] = useState<IParameters>({
    menopausal_status: null,
    platelets: null,
    albumin: null,
    globulin: null,
    solid: null,
    papillary_projection: null,
    cyst_wall: null,
    septum: null,
    ca_125: null,
  });

  const cbc_us_ca125 = (
    Menopausal: number | null,
    P: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null,
    CA125: number | null
  ): number => {
    const w =
      -6.527 +
      0.874 * (Menopausal ?? 0) +
      0.008 * (P ?? 0) +
      1.484 * (Solid ?? 0) +
      2.446 * (Papillary ?? 0) +
      1.389 * (Septum ?? 0) +
      0.002 * (CA125 ?? 0);

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const us_ca125 = (
    Menopausal: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null,
    CA125: number | null
  ) => {
    const w =
      -4.06 +
      0.749 * (Menopausal ?? 0) +
      1.832 * (Solid ?? 0) +
      2.14 * (Papillary ?? 0) +
      1.173 * (Septum ?? 0) +
      0.003 * (CA125 ?? 0);

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const cbc_us = (
    Menopausal: number | null,
    P: number | null,
    Solid: number | null,
    Papillary: number | null,
    Septum: number | null
  ) => {
    const w =
      -7.316 +
      1.263 * (Menopausal ?? 0) +
      0.009 * (P ?? 0) +
      2.219 * (Solid ?? 0) +
      2.541 * (Papillary ?? 0) +
      1.313 * (Septum ?? 0);

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const us = (
    Menopausal: number | null,
    Solid: number | null,
    Papillary: number | null,
    CystWall: number | null,
    Septum: number | null
  ) => {
    const w =
      -4.308 +
      0.864 * (Menopausal ?? 0) +
      2.073 * (Solid ?? 0) +
      1.939 * (Papillary ?? 0) +
      1.172 * (CystWall ?? 0) +
      1.099 * (Septum ?? 0);
    return Math.exp(w) / (1 + Math.exp(w));
  };

  const lft_ca125 = (
    Menopausal: number | null,
    Globulin: number | null,
    CA125: number | null
  ) => {
    const w =
      -2.783 +
      0.8 * (Menopausal ?? 0) +
      0.256 * (Globulin ?? 0) +
      0.003 * (CA125 ?? 0);

    return Math.exp(w) / (1 + Math.exp(w));
  };

  const result = (): number => {
    if (
      parameter.menopausal_status !== null &&
      parameter.platelets !== null &&
      parameter.solid !== null &&
      parameter.papillary_projection !== null &&
      parameter.septum !== null &&
      parameter.ca_125 !== null
    ) {
      return (
        cbc_us_ca125(
          parameter.menopausal_status,
          parameter.platelets,
          parameter.solid,
          parameter.papillary_projection,
          parameter.septum,
          parameter.ca_125
        ) * 100
      );
    } else if (
      parameter.menopausal_status !== null &&
      parameter.solid !== null &&
      parameter.papillary_projection !== null &&
      parameter.septum !== null &&
      parameter.ca_125 !== null
    ) {
      return (
        us_ca125(
          parameter.menopausal_status,
          parameter.solid,
          parameter.papillary_projection,
          parameter.septum,
          parameter.ca_125
        ) * 100
      );
    } else if (
      parameter.menopausal_status !== null &&
      parameter.platelets !== null &&
      parameter.solid !== null &&
      parameter.papillary_projection !== null &&
      parameter.septum !== null
    ) {
      return (
        cbc_us(
          parameter.menopausal_status,
          parameter.platelets,
          parameter.solid,
          parameter.papillary_projection,
          parameter.septum
        ) * 100
      );
    } else if (
      parameter.menopausal_status !== null &&
      parameter.solid !== null &&
      parameter.papillary_projection !== null &&
      parameter.cyst_wall !== null &&
      parameter.septum !== null
    ) {
      return (
        us(
          parameter.menopausal_status,
          parameter.solid,
          parameter.papillary_projection,
          parameter.cyst_wall,
          parameter.septum
        ) * 100
      );
    } else if (
      parameter.menopausal_status !== null &&
      parameter.globulin !== null &&
      parameter.ca_125 !== null
    ) {
      return (
        lft_ca125(
          parameter.menopausal_status,
          parameter.globulin,
          parameter.ca_125
        ) * 100
      );
    }
    return 0;
  };

  const chartResult = [
    cbc_us_ca125(
      parameter.menopausal_status,
      parameter.platelets,
      parameter.solid,
      parameter.papillary_projection,
      parameter.septum,
      parameter.ca_125
    ) * 100,
    us_ca125(
      parameter.menopausal_status,
      parameter.solid,
      parameter.papillary_projection,
      parameter.septum,
      parameter.ca_125
    ) * 100,
    cbc_us(
      parameter.menopausal_status,
      parameter.platelets,
      parameter.solid,
      parameter.papillary_projection,
      parameter.septum
    ) * 100,
    us(
      parameter.menopausal_status,
      parameter.solid,
      parameter.papillary_projection,
      parameter.cyst_wall,
      parameter.septum
    ) * 100,
    lft_ca125(
      parameter.menopausal_status,
      parameter.globulin,
      parameter.ca_125
    ) * 100,
  ];

  const contextValue = {
    parameter,
    setParameter,
    cbc_us_ca125,
    us_ca125,
    cbc_us,
    us,
    lft_ca125,
    chartResult,
    result,
  };

  return (
    <AnalysisContext.Provider value={contextValue}>
      {children}
    </AnalysisContext.Provider>
  );
};
