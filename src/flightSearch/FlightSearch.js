/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useMemo, useContext } from "react";
// import "./styles.scss";
import airlines from "../airlines.json";
import results from "../result.json";
import CheckBox from "../checkbox/Checkbox";
import Header from "../Header /Header";
import "./style.css";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import format from "date-fns/format";
import { appContext } from "../appContext/AppProvider";

const findValidatingAirlines = (data, filterTerms) => {
  let filterData = data;
  if (filterTerms.length) {
    const isMatchingFilterTerm = (termToMatch) => {
      const isMatching = filterTerms.find((airlineCode) => {
        if (airlineCode === termToMatch) {
          return true;
        }
      });
      return Boolean(isMatching);
    };
    const filterElement = (element) => {
      const isTrue = isMatchingFilterTerm(element.ValidatingAirlineCode);
      if (isTrue) {
        return true;
      }
      return false;
    };
    filterData = data.filter(filterElement);
  }
  return filterData;
};

const FlightTimeLocationDate = ({ date, location }) => {
  const dateObj = new Date(date);
  const formattedDate = format(dateObj, "dd/MM/yyyy");
  const formattedTime = format(dateObj, "HH:mm");
  return (
    <>
      <div>{formattedTime}</div>
      <div>{location}</div>
      <div>{formattedDate}</div>
    </>
  );
};

const Duration = ({ departureDate, arrivalDate, stops }) => {
  const departureDateObj = new Date(arrivalDate);
  const arrivalDateObj = new Date(departureDate);
  return (
    <>
      <div>{formatDistanceStrict(arrivalDateObj, departureDateObj, {})}</div>
      <div>{stops} Stops</div>
    </>
  );
};

const FlightSearch = (props) => {
  const [filterTerms, setFilterTerms] = useState([]);
  const airlinesIataNameMap = useMemo(() => {
    return airlines.reduce((mapper, airline) => {
      return {
        ...mapper,
        [airline.iata]: airline.name,
      };
    }, {});
  }, []);

  const flightData = useMemo(
    () => findValidatingAirlines(results.Data.PricedItineraries, filterTerms),
    [filterTerms]
  );

  const { onFlightSelect } = useContext(appContext);

  return (
    <div className="flight-container">
      <Header />
      <div className="flight-wrapper">
        <div className="filter-section">
          <div className="heading-text">Filter by airlines</div>
          <div>
            {airlines.map((item) => (
              <div className="item-wrapper" key={item.iata}>
                <CheckBox
                  //   checked={searchTerm.includes(item.key)}
                  onChange={(isChecked) => {
                    const nextFilterTerms = [...filterTerms];
                    if (isChecked) {
                      nextFilterTerms.push(item.iata);
                    } else {
                      const indexToRemove = nextFilterTerms.findIndex(
                        (checkedEl) => checkedEl === item.iata
                      );
                      nextFilterTerms.splice(indexToRemove, 1);
                    }
                    setFilterTerms(nextFilterTerms);
                  }}
                  id={item.iata}
                >
                  {item.name.toString()}
                </CheckBox>
              </div>
            ))}
          </div>
        </div>
        <div className="list-section">
          <div className="list-header">
            <div>flight</div>
            <div>departure</div>
            <div>duration</div>
            <div>arrival</div>
          </div>
          {flightData.map((data, index) => (
            <div className="flight-detail" key={index}>
              <div>
                <div>{airlinesIataNameMap[data.ValidatingAirlineCode]}</div>
              </div>
              <div>
                <div>
                  <FlightTimeLocationDate
                    date={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureDateTime
                    }
                    location={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureAirportLocationCode
                    }
                  />
                  {}
                </div>
              </div>
              <div>
                <div>
                  <Duration
                    arrivalDate={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .ArrivalDateTime
                    }
                    departureDate={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureDateTime
                    }
                    stops={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .StopQuantity
                    }
                  />
                  {}
                </div>
              </div>
              <div>
                <div>
                  <FlightTimeLocationDate
                    date={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .ArrivalDateTime
                    }
                    location={
                      data.OriginDestinationOptions[0].FlightSegments[0]
                        .ArrivalAirportLocationCode
                    }
                  />
                  {}
                </div>
              </div>
              <div>
                <div
                  onClick={() => {
                    onFlightSelect({
                      date: format(
                        new Date(
                          data.OriginDestinationOptions[0].FlightSegments[0].DepartureDateTime
                        ),
                        "dd MMMM yyyy"
                      ),
                      from: data.OriginDestinationOptions[0].FlightSegments[0]
                        .DepartureAirportLocationCode,
                      to: data.OriginDestinationOptions[0].FlightSegments[0]
                        .ArrivalAirportLocationCode,
                    });
                  }}
                >
                  <div>Book Flight</div>
                  {`${data.AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode} ${data.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount}`}
                </div>
              </div>
            </div>
          ))}
          {/* {FlightData.map(
            a =>
              (a.other_details = FlightDetail.Data.PricedItineraries.filter(
                b => b.ValidatingAirlineCode == a.iata
              )
                ? console.log(a.name)
                : console.log(a.iata))
          )} */}
        </div>
      </div>
    </div>
  );
};
export default FlightSearch;
