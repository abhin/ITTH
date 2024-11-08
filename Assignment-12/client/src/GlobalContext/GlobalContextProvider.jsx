import { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function GlobalContextProvider({ children }) {
  
  return (
    <GlobalContext.Provider
      value={{}}
    >
      {children}
    </GlobalContext.Provider>
  );
}
