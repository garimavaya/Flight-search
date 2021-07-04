import React, { createContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

export const appContext = createContext({});

function AppProvider(props) {
  const history = useHistory();
  const [bookingInfo, setBookingInfo] = useState({});
  const onFlightSelect = useCallback(
    ({ from, to, date }) => {
      setBookingInfo({
        from,
        to,
        date,
      });
      history.push("/success");
    },
    [history]
  );
  return (
    <appContext.Provider value={{ onFlightSelect, bookingInfo }}>
      {props.children}
    </appContext.Provider>
  );
}

export default AppProvider;
