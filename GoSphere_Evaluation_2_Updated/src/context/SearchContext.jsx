import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [latestSearch, setLatestSearch] = useState(null);           // Train search
  const [latestFlightSearch, setLatestFlightSearch] = useState(null); // Flight search
  const [latestBusSearch, setLatestBusSearch] = useState(null);      // Bus search

  const value = useMemo(
    () => ({
      latestSearch, setLatestSearch,
      latestFlightSearch, setLatestFlightSearch,
      latestBusSearch, setLatestBusSearch,
    }),
    [latestSearch, latestFlightSearch, latestBusSearch]
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// The hook is colocated with its context to keep this small project easy to follow.
// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used inside SearchProvider");
  }
  return context;
}
