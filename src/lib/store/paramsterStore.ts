import { IParameters } from "@/interfaces/parameter";
import { persist, devtools } from "zustand/middleware";
import { StateCreator, create } from "zustand";

interface IParametersStore {
    parameters: IParameters;
    setParameters: (parameters: IParameters) => void;
}

const store: StateCreator<IParametersStore> = (set) => ({
    parameters: {} as IParameters,
    setParameters: (parameters: IParameters) => set({ parameters }),
});

export const useParamsterStore = create(
    devtools(
        persist(store, {
            name: "parameters",
        })
    )
);

