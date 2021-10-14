import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faLightbulb,
  faTrashAlt,
  faBurn,
  faFile,
  faUtensils,
  faIcons,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Tabs, Layout, Divider } from "antd";
import "./calculator.css";
import "../style.css";

// Imports for Calculator DB ~Alex
import { useHistory } from "react-router-dom"; // redirects
import { Button as BootButton, Modal } from "react-bootstrap"; // For Modal
import { API, graphqlOperation, Auth } from "aws-amplify"; // Used for sending DynamoDB
import { createReport } from "../graphql/mutations"; // For creating Reports
import { getID } from "../graphql/customQueries"; // For creating Reports

/*
Added in the database API all ye need to do is;
- Add items to the graphql schema (e.g. totalCarbon: String) based on what ye need
- push that schema to amplify (amplify push --y)
- then add the new items it to const report() (e.g. totalCarbon: emissionData.totalCarbon)

Refer to Discord Back-end chat for futher tips/tricks

To-Dos
- Since the calculator.js file changed the local storage is broken.

From Alex :D
*/

/* -- CONSTANTS ----------------------------------------------------- */

const transportIcon = (
  <FontAwesomeIcon style={{ marginRight: 8 }} icon={faRoute} />
);
const electricityIcon = (
  <FontAwesomeIcon style={{ marginRight: 8 }} icon={faLightbulb} />
);
const gasIcon = <FontAwesomeIcon style={{ marginRight: 8 }} icon={faBurn} />;
const wasteIcon = (
  <FontAwesomeIcon style={{ marginRight: 8 }} icon={faTrashAlt} />
);
const waterIcon = <FontAwesomeIcon style={{ marginRight: 8 }} icon={faTint} />;
const paperIcon = <FontAwesomeIcon style={{ marginRight: 8 }} icon={faFile} />;
const foodAndDrinkIcon = (
  <FontAwesomeIcon style={{ marginRight: 8 }} icon={faUtensils} />
);
const eventsIcon = (
  <FontAwesomeIcon style={{ marginRight: 8 }} icon={faIcons} />
);

const { Content } = Layout;
const { TabPane } = Tabs;

/* ------------------------------------------------------------------ */

const Calculator = () => {
  const [emission, setEmissions] = useState([]);
  const [emissionData, setEmissionData] = useState([]);

  /* -- Unit of Measurement Data ------------------------------------ */

  const metric = {
    uom: "Metric",
    distance: "Kilometres",
    consumption: "kW Hours",
    gas: "Litres",
    waste: "Tonnes",
    weight: "Kilograms",
    dollar: "AUD",
  };

  const imperial = {
    uom: "Imperial",
    distance: "Miles",
    consumption: "hP",
    gas: "Gallons",
    waste: "Tons",
    weight: "Pounds",
    dollar: "USD",
  };

  /* -- Calculator Switch Handlers ---------------------------------- */

  const [uom, setUom] = useState(metric);
  const [advCalc, setAdvCalc] = useState(false);

  const handleUom = (e) => {
    if (e) {
      setUom(imperial);
    } else {
      setUom(metric);
    }
  };

  const handleAdvCalc = (e) => {
    if (e) {
      setAdvCalc(true);
    } else {
      setAdvCalc(false);
    }
    clearState();
  };

  /* -- Form input handler ------------------------------------------ */

  const handleEmission = (e) => {
    const { type, id, name, value } = e.target;

    if (value === "" && type === "number") {
      setEmissions((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], [name]: 0 },
      }));
    } else if (type === "text") {
      setEmissions((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], [name]: value },
      }));
    } else {
      setEmissions((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], [name]: parseFloat(value) },
      }));
    }
  };

  const clearState = () => {
    setEmissions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emission.length !== 0) {
      const { id } = e.target;
      setEmissionData((emissionData) => [...emissionData, emission]);
      clearState();
      resetForms(id);
      //console.log(`Submitting emission ${JSON.stringify(emission, null, 2)}`);
    }
  };

  const emissionList = emissionData.map((test, index) => (
    <li key={index}>{JSON.stringify(test)}</li>
  ));

  const calculate = async () => {
    //Add additional properties
    let totalCarbon = 0;
    let transportCarbon = 0;
    let electricityCarbon = 0;
    let gasCarbon = 0;
    let wasteCarbon = 0;
    let waterCarbon = 0;
    let paperCarbon = 0;
    let foodDrinkCarbon = 0;
    let eventsCarbon = 0;
    let date = new Date().toLocaleDateString();

    //Iterrate through each report object
    for (let i = 0; i < emissionData.length; i++) {
      let temp = 0;

      //Main Switch
      switch (true) {
        //Basic Vehicle Travel Case
        case emissionData[i].hasOwnProperty("vehicleTravel"):
          totalCarbon += emissionData[i].vehicleTravel.vehicleType;
          transportCarbon += emissionData[i].vehicleTravel.vehicleType;
          break;

        //Basic Air Travel Case
        case emissionData[i].hasOwnProperty("airTravel"):
          let tempCabinClass = emissionData[i].airTravel.cabinClass;
          let tempDistance = emissionData[i].airTravel.airDistance;

          switch (tempCabinClass) {
            case 1:
              temp = Math.pow(0.00040532 * tempDistance, 0.934661) - 0.106027;
              break;
            case 2:
              temp =
                Math.pow(0.000202965 * tempDistance, 0.973721) + 0.00407937;
              break;
            case 3:
              temp = Math.pow(0.00040532 * tempDistance, 0.934661) - 0.106027;
              break;
            case 4:
              temp = Math.pow(0.00040532 * tempDistance, 0.934661) - 0.106027;
              break;
            case 5:
              temp = Math.pow(0.00040532 * tempDistance, 0.934661) - 0.106027;
              break;
            default:
              console.log("-- main switch error --");
          }

          if (temp < 0) {
            temp = 0;
          }
          totalCarbon += temp;
          transportCarbon += temp;
          break;

        //Basic Public Travel Case
        case emissionData[i].hasOwnProperty("publicTravel"):
          let tempTransportMethod =
            emissionData[i].publicTravel.transportMethod;
          let tempTransportType = emissionData[i].publicTravel.transportType;
          let tempDistancePub = emissionData[i].publicTravel.pubDistance;

          if (tempTransportMethod === 1) {
            if (tempTransportType === 1) {
              temp =
                Math.pow(0.0000884831 * tempDistancePub, 0.934661) - 0.106027;
            } else if (tempTransportType === 2) {
              temp =
                Math.pow(0.0000497395 * tempDistancePub, 0.998722) - 0.00129669;
            } else if (tempTransportType === 3) {
              temp =
                Math.pow(0.0000570462 * tempDistancePub, 0.999922) + 0.00049945;
            } else {
              console.log(
                "There was an unexpected transport TYPE in calculate function bus"
              );
            }
          } else if (tempTransportMethod === 2) {
            if (tempTransportType === 1) {
              temp =
                Math.pow(0.000111839 * tempDistancePub, 1.00013) - 0.0000298673;
            } else if (tempTransportType === 2) {
              temp =
                Math.pow(0.000041585 * tempDistancePub, 0.998798) - 0.0013409;
            } else if (tempTransportType === 3) {
              temp = 0.00118995 * tempDistancePub + 0.000183289;
            } else {
              console.log(
                "There was an unexpected transport TYPE in calculate function train"
              );
            }
          } else {
            console.log(
              "There was an unexpected transport METHOD in calculate function"
            );
          }

          if (temp < 0) {
            temp = 0;
          }
          totalCarbon += temp;
          transportCarbon += temp;
          break;

        //Basic Electricity Case
        case emissionData[i].hasOwnProperty("electricity"):
          electricityCarbon +=
            Math.pow(
              0.00086905 * emissionData[i].electricity.electricityConsumption,
              1.00009
            ) + 0.00160968;
          totalCarbon +=
            Math.pow(
              0.00086905 * emissionData[i].electricity.electricityConsumption,
              1.00009
            ) + 0.00160968;
          break;

        //Basic Gas Case
        case emissionData[i].hasOwnProperty("gas"):
          break;

        //Basic Waste Case
        case emissionData[i].hasOwnProperty("waste"):
          totalCarbon +=
            emissionData[i].waste.wasteType * emissionData[i].waste.wasteWeight;
          wasteCarbon +=
            emissionData[i].waste.wasteType * emissionData[i].waste.wasteWeight;
          break;

        //Basic Water Case
        case emissionData[i].hasOwnProperty("water"):
          let waterLocation = emissionData[i].water.waterUtilityLocation;

          switch (waterLocation) {
            case "ACT":
              totalCarbon += 0.27;
              waterCarbon += 0.27;
              break;
            case "NSW":
              totalCarbon += 0.14;
              waterCarbon += 0.14;
              break;
            case "NT":
              totalCarbon += 0.41;
              waterCarbon += 0.41;
              break;
            case "QLD":
              totalCarbon += 0.17;
              waterCarbon += 0.17;
              break;
            case "SA":
              totalCarbon += 0.27;
              waterCarbon += 0.27;
              break;
            case "TAS":
              totalCarbon += 0.1;
              waterCarbon += 0.1;
              break;
            case "VIC":
              totalCarbon += 0.1;
              waterCarbon += 0.1;
              break;
            case "WA":
              totalCarbon += 0.46;
              waterCarbon += 0.46;
              break;
            case "Australian Average":
              totalCarbon += 0.22;
              waterCarbon += 0.22;
              break;
            default:
              console.log("-- main switch error --");
          }
          break;

        //Basic Paper Case
        case emissionData[i].hasOwnProperty("paper"):
          let source = emissionData[i].paper.source;
          let paperType = emissionData[i].paper.paperType;
          let paperWeight = emissionData[i].paper.paperWeight;

          switch (source) {
            case 1:
              if (paperType === 1) {
                temp =
                  Math.pow(0.00235612 * paperWeight, 0.999719) - 0.00358936;
              } else if (paperType === 2) {
                temp =
                  Math.pow(0.00265348 * paperWeight, 0.999844) - 0.000197495;
              } else {
                console.log("There was an unexpected paperType");
              }
              break;
            case 2:
              if (paperType === 1) {
                temp =
                  Math.pow(0.00322242 * paperWeight, 0.999922) - 0.00090519;
              } else if (paperType === 2) {
                temp = Math.pow(0.00351468 * paperWeight, 1.0016) + 0.00126615;
              } else {
                console.log("There was an unexpected paperType");
              }
              break;
            default:
              console.log("-- main switch error --");
          }

          if (temp < 0) {
            temp = 0;
          }
          totalCarbon += temp;
          paperCarbon += temp;
          break;

        //Basic foodAndDrink Case
        case emissionData[i].hasOwnProperty("foodAndDrink"):
          let foodType = emissionData[i].foodAndDrink.foodType;
          let expenditure = emissionData[i].foodAndDrink.expenditure;

          switch (foodType) {
            case 1:
              temp = Math.pow(0.00163526 * expenditure, 1.00116) + 0.00230795;
              break;
            case 2:
              temp = Math.pow(0.000140557 * expenditure, 0.989971) - 0.0015257;
              break;
            case 3:
              temp = Math.pow(0.00588688 * expenditure, 1.0024) + 0.00135518;
              break;
            case 4:
              temp = Math.pow(0.00901502 * expenditure, 1.00138) - 0.000199918;
              break;
            case 5:
              temp = Math.pow(0.000390022 * expenditure, 1.00058) - 0.00124577;
              break;
            case 6:
              temp = Math.pow(0.000470379 * expenditure, 0.994551) - 0.00350373;
              break;
            case 7:
              temp = Math.pow(0.000354663 * expenditure, 0.994863) - 0.00270374;
              break;
            case 8:
              temp = Math.pow(0.00051407 * expenditure, 0.993723) - 0.00194128;
              break;
            case 9:
              temp = Math.pow(0.000212832 * expenditure, 1.00562) - 0.00136793;
              break;
            case 10:
              temp = Math.pow(0.00574957 * expenditure, 0.998251) + 0.00215296;
              break;
            case 11:
              temp = Math.pow(0.000590206 * expenditure, 0.999565) + 0.00154406;
              break;
            default:
              console.log("-- main switch error --");
          }
          if (temp < 0) {
            temp = 0;
          }
          totalCarbon += temp;
          foodDrinkCarbon += temp;
          break;

        //Basic Events Case
        case emissionData[i].hasOwnProperty("events"):
          let totalAccommodation = emissionData[i].events.totalAccommodation;
          let totalMeals = emissionData[i].events.totalMeals;
          let totalDrinks = emissionData[i].events.totalDrinks;
          let totalEventProducts = emissionData[i].events.totalEventProducts;

          temp += 0.00514103 * totalAccommodation - 0.00420484;
          temp += 0.000582526 * totalMeals + 0.0251179;
          temp += 0.000465789 * totalDrinks + 0.00124214;
          temp += 0.00515486 * totalEventProducts + 0.00872642;

          //Technically no way for temp to be less than 0 if users are unable to enter negative numbers.
          if (temp < 0) {
            temp = 0;
          }

          totalCarbon += temp;
          eventsCarbon += temp;

          break;

        //Add Adv Case

        default:
          console.log("-- main switch error --");
      }
    }
    

    //Hello message from nathan test.
    let tempTotalCarbon = totalCarbon.toString();
    let tempTransportCarbon = transportCarbon.toString();
    let tempElectricityCarbon = electricityCarbon.toString();
    let tempGasCarbon = gasCarbon.toString();
    let tempWasteCarbon = wasteCarbon.toString();
    let tempWaterCarbon = waterCarbon.toString();
    let tempPaperCarbon = paperCarbon.toString();
    let tempFoodDrinkCarbon = foodDrinkCarbon.toString();
    let tempEventsCarbon = eventsCarbon.toString();

      try{
        Auth.currentUserInfo().then((userInfo) => {
          if(userInfo == null){ // If not signed in head to login page
            localStorage.setItem('calculate_data','true') // Add to local storage. And will be removed when user is tasken to Carbon reports
           // history.push('login');
          }
        })   
        // If the user is still here they must be logged in 
        // thus we send the data to DB
    
        const data = await Auth.currentUserPoolUser();
        const userInfo = { ...data.attributes };
      
        // Add the inputs you want to store to the Report graphql schema note "!" means required; check out discord #back-end for further tips ~ Alex
        const report = {
          userID: userInfo.sub,
          date: date,
          totalCarbon: tempTotalCarbon,
          transportCarbon: tempTransportCarbon,
          electricityCarbon: tempElectricityCarbon,
          gasCarbon: tempGasCarbon,
          wasteCarbon: tempWasteCarbon,
          waterCarbon: tempWaterCarbon,
          paperCarbon: tempPaperCarbon,
          foodDrinkCarbon: tempFoodDrinkCarbon,
          eventsCarbon: tempEventsCarbon
        };

        console.log(report);
         await API.graphql(graphqlOperation(createReport, { input: report}));
         //history.push('carbon_report'); // MUST FIX; should send user to carbon report
    
      }catch(e){
        console.error("Error in calculator.js report method: ", e)
      }
    
  };

  function resetForms(id) {
    console.log(id);
    switch (id) {
      case "transport":
        document.getElementById("transportForm").reset();
        break;
      case "electricity":
        document.getElementById("electricityForm").reset();
        break;
      case "gas":
        document.getElementById("gasForm").reset();
        break;
      case "waste":
        document.getElementById("wasteForm").reset();
        break;
      case "water":
        document.getElementById("waterForm").reset();
        break;
      case "paper":
        document.getElementById("paperForm").reset();
        break;
      case "foodAndDrink":
        document.getElementById("foodAndDrinkForm").reset();
        break;
      case "events":
        document.getElementById("eventsForm").reset();
        break;
      default:
        console.log("reset failed - " + id);
    }
  }

  /* -------- Local Storage --------*/
  // OUTDATED
  // Add to Local Storage
  React.useEffect(() => {
    // Every time the emission data is changed this will trigger
    localStorage.setItem("emission_key", JSON.stringify(emission, null, 2));
  }, [emission]);

  // FIX Emission/EmissionData stored in local storage
  // OUTDATED - When page is refreshed the local storage will be pulled
  function getFormValues() {
    const storedValues = localStorage.getItem("emission_key");
    if (!storedValues)
      return {
        totalCarbon: 0,
        transportTotal: 0,
        vehicleType: 0,
        cabinClass: 0,
        airDistance: 0,
        transportMethod: 0,
        transportType: 0,
        pubDistance: 0,

        // TEST INPUT FOR CALC TYPE -- will implement all once client provides us with calculation data...
        ADVANCED_INPUT: 0,

        electricityTotal: 0,
        consumption: 0,

        gasTotal: 0,
        lpgConsumption: 0,
        gasConsumption: 0,
        unitOfMeasurement: 0,
        stateOrTerritory: 0,

        wasteTotal: 0,
        wasteType: 0,
        wasteWeight: 0,

        waterTotal: 0,
        waterUtilityLocation: 0,

        paperTotal: 0,
        source: 0,
        paperType: 0,
        paperWeight: 0,

        foodAndDrinkTotal: 0,
        foodType: 0,
        expenditure: 0,

        eventsTotal: 0,
        totalAccommodation: 0,
        totalMeals: 0,
        totalDrinks: 0,
        totalEventProducts: 0,
      };

    return JSON.parse(storedValues);
  }
  // OUTDATED
  // Sets local storage to default value
  const clearFormValues = async () => {
    localStorage.removeItem("emission_key");
    setEmissions(getFormValues());
    // handleClose();
  };

  /* -------- End of Local Storage --------*/

  /* --- Send Data to DB ----- */
  const report = async () => {
    try {
      Auth.currentUserInfo().then((userInfo) => {
        if (userInfo == null) {
          // If not signed in head to login page
          localStorage.setItem("calculate_data", "true"); // Add to local storage. And will be removed when user is tasken to Carbon reports
          // history.push('login');
        }
      });
      // If the user is still here they must be logged in
      // thus we send the data to DB

      const getUser = await API.graphql(graphqlOperation(getID));

      // Add the inputs you want to store to the Report graphql schema note "!" means required; check out discord #back-end for further tips ~ Alex
      const newReport = {
        userID: getUser.data.listUsers.items[0].id,
        emissions: emissionData.totalCarbon,
      };
      await API.graphql(graphqlOperation(createReport, { input: newReport }));
      //history.push('carbon_report'); // MUST FIX; should send user to carbon report
    } catch (e) {
      console.error("Error in calculator.js report method: ", e);
    }
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="calculatorContent">
      <Card
        id="calculatorCard"
        bordered={false}
        title={<h1 id="centreContent">Carbon Calculator</h1>}
      >
        <Tabs defaultActiveKey="Transport" onChange={callback}>
          <TabPane
            tab={<div className="standardText"> {transportIcon}Transport</div>}
            key="Transport"
          >
            <div id="calculatorForm">
              <form id="transportForm">
                {advCalc ? (
                  // ADVANCED TRANSPORT FORM
                  <div>
                    <h2>Vehicle</h2>

                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="vehicleTravelAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Landcruiser)"
                    />

                    <label>Number of Vehicles</label>
                    <input
                      className="userInput"
                      type="number"
                      id="vehicleTravelAdv"
                      name="numberOfVehicles"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <label>Fuel Type</label>
                    <select
                      required
                      className="userInput"
                      id="vehicleTravelAdv"
                      name="fuelType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="0.24">Petrol (RON91-98)</option>
                      <option value="0.29">Diesel</option>
                      <option value="0.01">Biodiesel</option>
                      <option value="0.01">Biofuel</option>
                      <option value="0.17">LPG</option>
                      <option value="0.21">E10 (Petrol w 10% Ethanol)</option>
                      <option value="0.01">Ethanol</option>
                    </select>

                    <Divider orientation="left"> Estimate By * </Divider>

                    <label>Fuel Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="vehicleTravelAdv"
                      name="fuelConsumption"
                      onChange={handleEmission}
                      placeholder={uom.gas}
                    />

                    <Divider plain> OR </Divider>

                    <label>Vehicle Travel Distance</label>
                    <input
                      className="userInput"
                      type="number"
                      id="vehicleTravelAdv"
                      name="travelDistance"
                      onChange={handleEmission}
                      placeholder={uom.distance}
                    />

                    <label>Fuel Efficiency</label>
                    <input
                      className="userInput"
                      type="number"
                      id="vehicleTravelAdv"
                      name="fuelEfficiency"
                      onChange={handleEmission}
                      placeholder="L/100 km"
                    />

                    <Divider />

                    <div>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="vehicleTravelAdv"
                          name="includeCO2"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CO<sub>2</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="vehicleTravelAdv"
                          name="includeCH4"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CH<sub>4</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="vehicleTravelAdv"
                          name="includeN2O"
                          value=""
                          onChange={handleEmission}
                        />
                        Include N<sub>2</sub>O Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="vehicleTravelAdv"
                          name="includeSCOPE3"
                          value=""
                          onChange={handleEmission}
                        />
                        Include SCOPE 3 Emissions
                      </label>
                    </div>
                    <br />

                    <h2>Air Travel</h2>

                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="airTravelAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Conference Trip)"
                    />

                    <label>Cabin Class</label>
                    <select
                      required
                      className="userInput"
                      id="airTravelAdv"
                      name="cabinClass"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Average</option>
                      <option value="2">Economy</option>
                      <option value="3">Premium Economy</option>
                      <option value="2">Business Class</option>
                      <option value="3">First Class</option>
                    </select>

                    <label>Number of Passengers</label>
                    <input
                      className="userInput"
                      type="number"
                      id="airTravelAdv"
                      name="passengers"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <label>Distance</label>
                    <input
                      className="userInput"
                      type="number"
                      id="airTravelAdv"
                      name="airDistance"
                      onChange={handleEmission}
                      placeholder={uom.distance}
                    />

                    <div>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="returnFlight"
                          value=""
                          onChange={handleEmission}
                        />
                        Include Return Flight
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="includeCO2"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CO<sub>2</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="includeCH4"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CH<sub>4</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="includeN2O"
                          value=""
                          onChange={handleEmission}
                        />
                        Include N<sub>2</sub>O Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="includeINDIRECT"
                          value=""
                          onChange={handleEmission}
                        />
                        Include INDIRECT Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="airTravelAdv"
                          name="includeRFI"
                          value=""
                          onChange={handleEmission}
                        />
                        Include RADIATIVE FORCING INDEX(RFI) of 1.9
                      </label>
                    </div>
                    <br />

                    <h2>Public Transport</h2>

                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="publicTravelAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Trip to the city)"
                    />

                    <label>Transport Method</label>
                    <select
                      required
                      className="userInput"
                      id="publicTravelAdv"
                      name="transportMethod"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Bus</option>
                      <option value="2">Train</option>
                    </select>

                    <label>Transport Type</label>
                    <select
                      required
                      className="userInput"
                      id="publicTravelAdv"
                      name="transportType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Average Passenger Load</option>
                      <option value="2">Urban Commute</option>
                      <option value="3">Long Distance</option>
                    </select>

                    <label>Number of Passengers</label>
                    <input
                      className="userInput"
                      type="number"
                      id="publicTravelAdv"
                      name="passengers"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <label>Distance</label>
                    <input
                      className="userInput"
                      type="number"
                      id="publicTravelAdv"
                      name="pubDistance"
                      onChange={handleEmission}
                      placeholder={uom.distance}
                    />
                  </div>
                ) : (
                  // BASIC TRANSPORT FORM
                  <div>
                    <h2>Vehicle</h2>

                    <label>Vehicle Type</label>
                    <select
                      required
                      className="userInput"
                      id="vehicleTravel"
                      name="vehicleType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="4.82">
                        Petrol large V8 car - heavy 4WD (13.2L/100km)
                      </option>
                      <option value="3.62">
                        Petrol large car (9.9L/100km)
                      </option>
                      <option value="3.58">
                        Petrol medium 4WD (9.8L/100km)
                      </option>
                      <option value="2.74">
                        Petrol medium car (7.5L/100km)
                      </option>
                      <option value="2.7">Petrol small 4WD (7.4L/100km)</option>
                      <option value="2.34">
                        Petrol small car (6.4L/100km)
                      </option>
                      <option value="2.08">
                        Petrol light car 1.5L (5.7L/100km)
                      </option>
                      <option value="1.1">
                        Petrol motorcycle 251cc (3.0L/100km)
                      </option>
                      <option value="1.75">
                        Petrol motorcycle 251-999cc (4.8L/100km)
                      </option>
                      <option value="2.08">
                        Petrol motorcycle 999cc (5.7L/100km)
                      </option>
                      <option value="0.95">
                        Petrol scooter 125cc (2.6L/100km)
                      </option>
                      <option value="1.42">
                        Petrol hybrid small car (3.9L/100km)
                      </option>
                      <option value="1.75">
                        Petrol hybrid medium car (4.8L/100km)
                      </option>
                      <option value="3.6">Diesel Heavy 4WD (8.4L/100km)</option>
                      <option value="4.08">
                        Diesel large car (9.5L/100km)
                      </option>
                      <option value="2.7">
                        Diesel medium 4WD (6.3L/100km)
                      </option>
                      <option value="2.36">
                        Diesel medium car (5.5L/100km)
                      </option>
                      <option value="1.97">
                        Diesel small car (4.6L/100km)
                      </option>
                      <option value="2">
                        LPG large hybrid car (7.9L/100km)
                      </option>
                    </select>

                    <h2>Air Travel</h2>

                    <label>Cabin Class</label>
                    <select
                      required
                      className="userInput"
                      id="airTravel"
                      name="cabinClass"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Average</option>
                      <option value="2">Economy</option>
                      <option value="3">Premium Economy</option>
                      <option value="2">Business Class</option>
                      <option value="3">First Class</option>
                    </select>

                    <label>Distance</label>
                    <input
                      className="userInput"
                      type="number"
                      id="airTravel"
                      name="airDistance"
                      onChange={handleEmission}
                      placeholder={uom.distance}
                    />

                    <h2>Public Transport</h2>

                    <label>Transport Method</label>
                    <select
                      required
                      className="userInput"
                      id="publicTravel"
                      name="transportMethod"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Bus</option>
                      <option value="2">Train</option>
                    </select>

                    <label>Transport Type</label>
                    <select
                      required
                      className="userInput"
                      id="publicTravel"
                      name="transportType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Average Passenger Load</option>
                      <option value="2">Urban Commute</option>
                      <option value="3">Long Distance</option>
                    </select>

                    <label>Distance</label>
                    <input
                      className="userInput"
                      type="number"
                      id="publicTravel"
                      name="pubDistance"
                      onChange={handleEmission}
                      placeholder={uom.distance}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="transport"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={
              <div className="standardText"> {electricityIcon}Electricity</div>
            }
            key="Electricity"
          >
            <div id="calculatorForm">
              <form id="electricityForm">
                {advCalc ? (
                  // ADVANCED ELECTRICITY FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="electricityAdv"
                      name="electricityDescription"
                      onChange={handleEmission}
                      placeholder="Description (eg. Office Lighting)"
                    />

                    <label>Electricity Utility Location</label>
                    <select
                      required
                      className="userInput"
                      id="electricityAdv"
                      name="utilityLocation"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="0.09">ACT</option>
                      <option value="0.09">NSW</option>
                      <option value="0.07">NT</option>
                      <option value="0.09">QLD</option>
                      <option value="0.05">SA</option>
                      <option value="0.02">TAS</option>
                      <option value="0.21">VIC</option>
                      <option value="0.07">WA</option>
                      <option value="0.09">Australian Average</option>
                    </select>

                    <div>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="electricityAdv"
                          name="includeSCOPE2"
                          value=""
                          onChange={handleEmission}
                        />
                        Include SCOPE 2 Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="electricityAdv"
                          name="includeSCOPE3"
                          value=""
                          onChange={handleEmission}
                        />
                        Include SCOPE 3 Emissions
                      </label>
                    </div>
                    <br />
                  </div>
                ) : (
                  // BASIC ELECTRICITY FORM
                  <div>
                    <label>Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="electricity"
                      name="electricityConsumption"
                      onChange={handleEmission}
                      placeholder={uom.consumption}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="electricity"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={<div className="standardText"> {gasIcon}Gas</div>}
            key="Gas"
          >
            <div id="calculatorForm">
              <form id="gasForm">
                {advCalc ? (
                  // ADVANCED GAS FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="gasAdv"
                      name="gasDescription"
                      onChange={handleEmission}
                      placeholder="Description (ed. Workplace Gas Usage)"
                    />

                    <Divider />

                    <label>Gas Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="gasAdv"
                      name="gasConsumption"
                      onChange={handleEmission}
                      placeholder={uom.consumption}
                    />

                    <Divider plain> OR </Divider>

                    <label>LPG Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="gasAdv"
                      name="lpgConsumption"
                      onChange={handleEmission}
                      placeholder={uom.consumption}
                    />

                    <Divider />

                    <label>Unit of Measurement</label>
                    <select
                      required
                      className="userInput"
                      id="gasAdv"
                      name="unitOfMeasurement"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="">Kilowatt Hours</option>
                      <option value="">Megajoules</option>
                    </select>

                    <label>State or Territory</label>
                    <select
                      required
                      className="userInput"
                      id="gasAdv"
                      name="stateOrTerritory"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="23.27">ACT</option>
                      <option value="23.27">NSW</option>
                      <option value="21.68">NT</option>
                      <option value="21.72">QLD</option>
                      <option value="22.4">SA</option>
                      <option value="21.68">TAS</option>
                      <option value="19.99">VIC</option>
                      <option value="20.03">WA</option>
                    </select>

                    <div>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="gasAdv"
                          name="includeCO2"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CO<sub>2</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="gasAdv"
                          name="includeCH4"
                          value=""
                          onChange={handleEmission}
                        />
                        Include CH<sub>4</sub> Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="gasAdv"
                          name="includeN2O"
                          value=""
                          onChange={handleEmission}
                        />
                        Include N<sub>2</sub>O Emissions
                      </label>
                      <label className="checkboxLabel">
                        <input
                          className="checkboxes"
                          type="checkbox"
                          id="gasAdv"
                          name="includeSCOPE3"
                          value=""
                          onChange={handleEmission}
                        />
                        Include SCOPE 3 Emissions
                      </label>
                    </div>
                    <br />
                  </div>
                ) : (
                  // BASIC GAS FORM
                  <div>
                    <label>Gas Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="gas"
                      name="gasConsumption"
                      onChange={handleEmission}
                      placeholder={uom.consumption}
                    />

                    <Divider plain> OR </Divider>

                    <label>LPG Consumption</label>
                    <input
                      className="userInput"
                      type="number"
                      id="gas"
                      name="lpgConsumption"
                      onChange={handleEmission}
                      placeholder={uom.consumption}
                    />

                    <Divider />

                    <label>Unit of Measurement</label>
                    <select
                      required
                      className="userInput"
                      id="gas"
                      name="unitOfMeasurement"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="">Kilowatt Hours</option>
                      <option value="">Megajoules</option>
                    </select>

                    <label>State or Territory</label>
                    <select
                      required
                      className="userInput"
                      id="gas"
                      name="stateOrTerritory"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="23.27">ACT</option>
                      <option value="23.27">NSW</option>
                      <option value="21.68">NT</option>
                      <option value="21.72">QLD</option>
                      <option value="22.4">SA</option>
                      <option value="21.68">TAS</option>
                      <option value="19.99">VIC</option>
                      <option value="20.03">WA</option>
                    </select>
                  </div>
                )}

                <input
                  type="button"
                  id="gas"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={<div className="standardText"> {wasteIcon}Waste</div>}
            key="Waste"
          >
            <div id="calculatorForm">
              <form id="wasteForm">
                {advCalc ? (
                  // ADVANCED WASTE FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="wasteAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Office General Waste)"
                    />

                    <label>Waste Type</label>
                    <select
                      required
                      className="userInput"
                      id="wasteAdv"
                      name="wasteType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="210">Food</option>
                      <option value="330">Paper</option>
                      <option value="160">Garden</option>
                      <option value="0">Wood</option>
                      <option value="200">Textiles</option>
                      <option value="40">Sludge</option>
                      <option value="200">Nappies</option>
                      <option value="330">Rubber and leather</option>
                      <option value="0">
                        Inert waste (including concrete/metal/plastics/glass)
                      </option>
                      <option value="160">
                        Co-mingled mixed municpal solid waste
                      </option>
                      <option value="130">
                        Co-mingled mixed commericial and industrial waste
                      </option>
                      <option value="20">
                        Co-mingled mixed construction and demolition waste
                      </option>
                    </select>

                    <Divider />

                    <label>Weight</label>
                    <input
                      className="userInput"
                      type="number"
                      id="wasteAdv"
                      name="wasteWeight"
                      onChange={handleEmission}
                      placeholder={uom.waste}
                    />

                    <Divider plain> OR </Divider>

                    <label>Volume</label>
                    <input
                      className="userInput"
                      type="number"
                      id="wasteAdv"
                      name="wasteVolume"
                      onChange={handleEmission}
                      placeholder="m3"
                    />
                  </div>
                ) : (
                  // BASIC WASTE FORM
                  <div>
                    <label>Waste Type</label>
                    <select
                      required
                      className="userInput"
                      id="waste"
                      name="wasteType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="2.1">Food</option>
                      <option value="3.3">Paper</option>
                      <option value="1.6">Garden</option>
                      <option value="0">Wood</option>
                      <option value="2">Textiles</option>
                      <option value="0.4">Sludge</option>
                      <option value="2">Nappies</option>
                      <option value="3.3">Rubber and leather</option>
                      <option value="0">
                        Inert waste (including concrete/metal/plastics/glass)
                      </option>
                      <option value="1.6">
                        Co-mingled mixed municpal solid waste
                      </option>
                      <option value="1.3">
                        Co-mingled mixed commericial and industrial waste
                      </option>
                      <option value="0.2">
                        Co-mingled mixed construction and demolition waste
                      </option>
                    </select>

                    <label>Weight</label>
                    <input
                      className="userInput"
                      type="number"
                      id="waste"
                      name="wasteWeight"
                      onChange={handleEmission}
                      placeholder={uom.waste}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="waste"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={<div className="standardText"> {waterIcon}Water</div>}
            key="Water"
          >
            <div id="calculatorForm">
              <form id="waterForm">
                {advCalc ? (
                  // ADVANCED WATER FORM
                  <div>
                    <label>Water Utility Location</label>
                    <select
                      required
                      className="userInput"
                      id="waterAdv"
                      name="waterUtilityLocation"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">ACT</option>
                      <option value="2">NSW</option>
                      <option value="3">NT</option>
                      <option value="1">QLD</option>
                      <option value="2">SA</option>
                      <option value="3">TAS</option>
                      <option value="1">VIC</option>
                      <option value="2">WA</option>
                      <option value="3">Australian Average</option>
                    </select>

                    <label>Water Used</label>
                    <input
                      className="userInput"
                      type="number"
                      id="waterAdv"
                      name="waterConsumption"
                      onChange={handleEmission}
                      placeholder="kL"
                    />
                  </div>
                ) : (
                  // BASIC WATER FORM
                  <div>
                    <label>Water Utility Location</label>
                    <select
                      required
                      className="userInput"
                      id="water"
                      name="waterUtilityLocation"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="ACT">ACT</option>
                      <option value="NSW">NSW</option>
                      <option value="NT">NT</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="TAS">TAS</option>
                      <option value="VIC">VIC</option>
                      <option value="WA">WA</option>
                      <option value="Australian Average">
                        Australian Average
                      </option>
                    </select>
                  </div>
                )}

                <input
                  type="button"
                  id="water"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={<div className="standardText"> {paperIcon}Paper</div>}
            key="Paper"
          >
            <div id="calculatorForm">
              <form id="paperForm">
                {advCalc ? (
                  // ADVANCED PAPER FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="paperAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Office Printing)"
                    />

                    <label>Source</label>
                    <select
                      required
                      className="userInput"
                      id="paperAdv"
                      name="source"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Domestic</option>
                      <option value="2">Imported</option>
                    </select>

                    <label>Paper Type</label>
                    <select
                      required
                      className="userInput"
                      id="paperAdv"
                      name="paperType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Recycled</option>
                      <option value="2">Virgin (if paper type unknown)</option>
                    </select>

                    <label>Weight</label>
                    <input
                      className="userInput"
                      type="number"
                      id="paperAdv"
                      name="paperWeight"
                      onChange={handleEmission}
                      placeholder={uom.weight}
                    />
                  </div>
                ) : (
                  // BASIC PAPER FORM
                  <div>
                    <label>Source</label>
                    <select
                      required
                      className="userInput"
                      id="paper"
                      name="source"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Domestic</option>
                      <option value="2">Imported</option>
                    </select>

                    <label>Paper Type</label>
                    <select
                      required
                      className="userInput"
                      id="paper"
                      name="paperType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Recycled</option>
                      <option value="2">Virgin (if paper type unknown)</option>
                    </select>

                    <label>Weight</label>
                    <input
                      className="userInput"
                      type="number"
                      id="paper"
                      name="paperWeight"
                      onChange={handleEmission}
                      placeholder={uom.weight}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="paper"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={
              <div className="standardText">
                {" "}
                {foodAndDrinkIcon}Food And Drink
              </div>
            }
            key="FoodAndDrink"
          >
            <div id="calculatorForm">
              <form id="foodAndDrinkForm">
                {advCalc ? (
                  // ADVANCED FOOD AND DRINK FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="foodAndDrinkAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Shopping)"
                    />

                    <label>Food Type</label>
                    <select
                      required
                      className="userInput"
                      id="foodAndDrinkAdv"
                      name="foodType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Meat products</option>
                      <option value="2">Eggs</option>
                      <option value="3">Seafood</option>
                      <option value="1">Dairy</option>
                      <option value="2">Bread and cereals</option>
                      <option value="3">Fruit, vegetables and nuts</option>
                      <option value="1">
                        Sugar, packaged meals & confectionary
                      </option>
                      <option value="2">Non-alcoholic drinks</option>
                      <option value="3">Alcoholic take away drinks</option>
                      <option value="2">Take away and dining out</option>
                      <option value="3">TOTAL food and drink</option>
                    </select>

                    <label>Expenditure</label>
                    <input
                      className="userInput"
                      type="number"
                      id="foodAndDrinkAdv"
                      name="expenditure"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />
                  </div>
                ) : (
                  // BASIC FOOD AND PAPER FORM
                  <div>
                    <label>Food Type</label>
                    <select
                      required
                      className="userInput"
                      id="foodAndDrink"
                      name="foodType"
                      onChange={handleEmission}
                    >
                      <option value="" selected hidden>
                        Please Select
                      </option>
                      <option value="1">Meat products</option>
                      <option value="2">Eggs</option>
                      <option value="3">Seafood</option>
                      <option value="1">Dairy</option>
                      <option value="2">Bread and cereals</option>
                      <option value="3">Fruit, vegetables and nuts</option>
                      <option value="1">
                        Sugar, packaged meals & confectionary
                      </option>
                      <option value="2">Non-alcoholic drinks</option>
                      <option value="3">Alcoholic take away drinks</option>
                      <option value="2">Take away and dining out</option>
                      <option value="3">TOTAL food and drink</option>
                    </select>

                    <label>Expenditure</label>
                    <input
                      className="userInput"
                      type="number"
                      id="foodAndDrink"
                      name="expenditure"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="foodAndDrink"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <TabPane
            tab={<div className="standardText"> {eventsIcon}Events</div>}
            key="Events"
          >
            <div id="calculatorForm">
              <form id="eventsForm">
                {advCalc ? (
                  // ADVANCED EVENTS FORM
                  <div>
                    <label>Description</label>
                    <input
                      className="userInput"
                      type="text"
                      id="eventsAdv"
                      name="description"
                      onChange={handleEmission}
                      placeholder="Description (eg. Concert)"
                    />

                    <h2>Accommodation</h2>

                    <label>Number of Attendees in Accomodation</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="numberOfAttendees"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <label>Number of Nights per Attendee</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="numberOfNights"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <Divider />

                    <label>Average Daily Cost per Room</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="roomCost"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <Divider plain> OR </Divider>

                    <label>Total Spent on Accommodation</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalAccommodation"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <Divider />

                    <h2>Food And Drink</h2>

                    <label>Total Number of Meals</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="numberOfMeals"
                      onChange={handleEmission}
                      placeholder="Amount"
                    />

                    <Divider />

                    <label>Average Cost of Meals</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="avgCostOfMeals"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <Divider plain> OR </Divider>

                    <label>Total Spent on Meals</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalMeals"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <Divider />

                    <label>Total Spent on Non-Alcoholic Drinks</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalDrinks"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <label>Total Spent on Spirits</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalSpirits"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <label>Total Spent on Beer</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalBeer"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <label>Total Spent on Wine</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalWine"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <h2>Promotional Materials</h2>

                    <label>Total Spent on Plastic Products</label>
                    <input
                      className="userInput"
                      type="number"
                      id="eventsAdv"
                      name="totalEventProducts"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />
                  </div>
                ) : (
                  // BASIC EVENTS FORM
                  <div>
                    <h2>Accommodation</h2>

                    <label>Total Spent on Accommodation</label>
                    <input
                      className="userInput"
                      type="number"
                      id="events"
                      name="totalAccommodation"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <h2>Food And Drink</h2>

                    <label>Total Spent on Meals</label>
                    <input
                      className="userInput"
                      type="number"
                      id="events"
                      name="totalMeals"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <label>Total Spent on Non-Alcoholic Drinks</label>
                    <input
                      className="userInput"
                      type="number"
                      id="events"
                      name="totalDrinks"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />

                    <h2>Promotional Materials</h2>

                    <label>Total Spent on Plastic Products</label>
                    <input
                      className="userInput"
                      type="number"
                      id="events"
                      name="totalEventProducts"
                      onChange={handleEmission}
                      placeholder={uom.dollar}
                    />
                  </div>
                )}

                <input
                  type="button"
                  id="events"
                  className="formButton"
                  onClick={handleSubmit}
                  value="Add"
                />
              </form>
            </div>
          </TabPane>

          <Layout>
            <Content>
              <Card
                id="totalCard"
                title={<h2 id="centreContent">Carbon Report</h2>}
              >
                <ul>{emissionList}</ul>

                <input
                  type="button"
                  id="calculate"
                  className="formButton"
                  onClick={calculate}
                  value="Calculate"
                />
              </Card>
            </Content>
          </Layout>
        </Tabs>
      </Card>

      <div>
        <div class="switchContainer">
          <label class="switch" for="advBasic">
            <input
              type="checkbox"
              id="advBasic"
              name="advBasic"
              onClick={(e) => {
                handleAdvCalc(e.target.checked);
              }}
            />
            <div class="slider round"></div>
          </label>
          <h3 class="switchLabel">Advanced</h3>
        </div>

        <div class="switchContainer">
          <label class="switch" for="uom">
            <input
              type="checkbox"
              id="uom"
              name="uom"
              onClick={(e) => {
                handleUom(e.target.checked);
              }}
            />
            <div class="slider round"></div>
          </label>
          <h3 class="switchLabel">Imperial</h3>
        </div>
      </div>
    </div>
  );
};

export default Calculator;