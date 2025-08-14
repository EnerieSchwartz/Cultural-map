import { createContext } from "react";

export const FiltersContext = createContext({
  monument: true,
  religious: true,
  palace: true,
  museum: true,
  memorial: true,
  square: true,
  bridge: true,
});
