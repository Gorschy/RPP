import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faLightbulb, faTrashAlt, faBurn, faFile, faUtensils, faIcons, faRoute } from '@fortawesome/free-solid-svg-icons'
import { Button, Card , Tabs, Layout } from 'antd';
import './calculator.css';
import '../style.css';

const transportIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faRoute} />;
const electricityIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faLightbulb} />;
const gasIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faBurn} />;
const wasteIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faTrashAlt} />;
const waterIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faTint} />;
const paperIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faFile} />;
const foodAndDrinkIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faUtensils} />;
const eventsIcon = <FontAwesomeIcon style={{marginRight: 8}} icon={faIcons} />;


/* TODO: 
    - build logic maybe
    - once client provides calculation/input data handle uom conversion rates
    - add emission section addition part (every time add is clicked emission shown below)
*/ 

const { Content } = Layout;
const { TabPane } = Tabs;

function Calculator() {
  
  const [emission, setEmissions] = useState({
  
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
    totalEventProducts: 0
  });



  /* -- Unit of Measurement Data -- */
  const metric = {
    uom: 'Metric',
    distance: 'Kilometres',
    consumption: 'kW Hours',
    gas: 'Litres',
    waste: 'Tonnes',
    weight: 'Kilograms',
    dollar: 'AUD'
  };

  const imperial = {
    uom: 'Imperial',
    distance: 'Miles',
    consumption: 'hP',
    gas: 'Gallons',
    waste: 'Tons',
    weight: 'Pounds',
    dollar: 'USD'
  };
  
  /* -- Calculator Switch Handlers -- */
  const [uom, setUom] = useState(metric);
  const [advCalc, setAdvCalc] = useState(false);

  const handleUom = (e) => {
    if(e) {
      setUom(imperial);
    }
    else {
      setUom(metric);
    }
  }

  const handleAdvCalc = (e) => {
    if(e) {
      setAdvCalc(true);
    }
    else {
      setAdvCalc(false);
    }
  }
  /* -------------------------------- */

  const handleEmission = (e) => {
    
    const { name, value } = e.target;
    if(value === "") {
      setEmissions(prevState => ({
        ...prevState,
        [name]: 0
      }));
    } else {
      setEmissions(prevState => ({
        ...prevState,
        [name]: parseFloat(value)
      }));
    }
  }

  const totalEmissions = () => {
    return emission.transportTotal + emission.electricityTotal + emission.gasTotal + emission.wasteTotal + emission.waterTotal + emission.paperTotal + emission.foodAndDrinkTotal + emission.eventsTotal;  
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting emission ${JSON.stringify(emission, null, 2)}`);
    
  }

  function callback(key) {
    console.log(key);
  }

  return (  
    <div className='calculatorContent'>
    
      <Card
        id='calculatorCard'
        bordered={false} 
        title={<h1 id="centreContent">Carbon Calculator</h1>}
      >
        <Tabs defaultActiveKey="Transport" onChange={callback}>                          

          <TabPane tab={<div className="standardText"> {transportIcon}Transport</div>} key="Transport">
            
            <div>    
              <form className = 'basicForm'>

                <h2>Vehicle</h2>

                <label>Vehicle Type</label>
                <select
                  required
                  className = "userInput"
                  name = "vehicleType"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value='4.82'>Petrol large V8 car - heavy 4WD (13.2L/100km)</option>
                  <option value="2">Petrol large car (9.9L/100km)</option>
                  <option value="3">Petrol medium 4WD (9.8L/100km)</option>
                  <option value="2">Petrol medium car (7.5L/100km)</option>
                  <option value="3">Petrol small 4WD (7.4L/100km)</option>
                  <option value="2">Petrol small car (6.4L/100km)</option>
                  <option value="3">Petrol light car 1.5L (5.7L/100km)</option>
                  <option value="2">Petrol motorcycle 251cc (3.0L/100km)</option>
                  <option value="3">Petrol motorcycle 251-999cc (4.8L/100km)</option>
                  <option value="3">Petrol motorcycle 999cc (5.7L/100km)</option>
                  <option value="2">Petrol scooter 125cc (2.6L/100km)</option>
                  <option value="3">Petrol hybrid small car (3.9L/100km)</option>
                  <option value="2">Petrol hybrid medium car (4.8L/100km)</option>
                  <option value="3">Diesel Heavy 4WD (8.4L/100km)</option>
                  <option value="2">Diesel large car (9.5L/100km)</option>
                  <option value="3">Diesel medium 4WD (6.3L/100km)</option>
                  <option value="3">Diesel medium car (5.5L/100km)</option>
                  <option value="2">Diesel small car (4.6L/100km)</option>
                  <option value="3">LPG large hybrid car (7.9L/100km)</option>
                </select>

                <h2>Air Travel</h2>

                <label>Cabin Class</label>
                <select
                  required
                  className = 'userInput'
                  name = "cabinClass"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Average</option>
                  <option value="2">Economy</option>
                  <option value="3">Premium Economy</option>
                  <option value="2">Business Class</option>
                  <option value="3">First Class</option>
                </select>

                <label>Distance</label>
                <input
                  className='userInput' 
                  type='number'
                  name="airDistance"
                  onChange = {handleEmission}
                  placeholder={uom.distance}
                />

                <h2>Public Transport</h2>
                          
                <label>Transport Method</label>
                <select
                  required
                  className = 'userInput'
                  name = "transportMethod"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Bus</option>
                  <option value="2">Train</option>
                </select>

                <label>Transport Type</label>
                <select
                  required
                  className = 'userInput'
                  name = "transportType"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Average Passenger Load</option>
                  <option value="2">Urban Commute</option>
                  <option value="3">Long Distance</option>
                </select>

                <label>Distance</label>   
                <input
                  className='userInput'
                  name = "pubDistance"
                  onChange = {handleEmission}
                  type='number' 
                  placeholder={uom.distance}
                />

                { advCalc 
                  ? <div>
                      <label>Test</label>
                      <input
                        className='userInput'
                        name = "ADVANCED_INPUT"
                        onChange = {handleEmission}
                        type='number'
                        placeholder='adv Input'
                      />
                    </div>
                  : null 
                }  
               
                <Button type='primary' className='formButton' onClick={handleSubmit}>Add</Button>
                                            
              </form>                
            </div>
          </TabPane>
            
          <TabPane tab={<div className="standardText"> {electricityIcon}Electricity</div>} key="Electricity">
            <div>    
              <form className='basicForm'>

                <label>Consumption</label>
                <input
                  name = "consumption"
                  onChange = {handleEmission}
                  className='userInput'
                  type='number'
                  placeholder={uom.consumption}
                />
               
                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>
          </TabPane>

          <TabPane tab={<div className="standardText"> {gasIcon}Gas</div>} key="Gas">
            <div>    
              <form className='basicForm'>

                <label>LPG Consumption</label>
                <input
                  className='userInput'
                  name = "lpgConsumption"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.gas}
                />

                <h2 style={{textAlign: 'center'}}>or</h2>
                
                <label>Gas Consumption</label>
                <input
                  className='userInput'
                  name = "gasConsumption"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.gas}
                />

                <label>Unit of Measurement</label>
                <select
                  required
                  className = 'userInput'
                  name = "unitOfMeasurement"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Kilowatt hours</option>
                  <option value="2">Megajoules</option>
                </select>

                <label>State or Territory</label>
                <select
                  required
                  className = 'userInput'
                  name = "stateOrTerritory"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
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

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>
          </TabPane>

          <TabPane tab={<div className="standardText"> {wasteIcon}Waste</div>} key="Waste">
            <div>    
              <form className='basicForm'>
                
                <label>Waste Type</label>
                <select
                  required
                  className = 'userInput'
                  name = "wasteType"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Food</option>
                  <option value="2">Paper</option>
                  <option value="3">Garden</option>
                  <option value="1">Wood</option>
                  <option value="2">Textiles</option>
                  <option value="3">Sludge</option>
                  <option value="1">Rubber and leather</option>
                  <option value="2">Inert waste (including concrete/metal/plastics/glass)</option>
                  <option value="3">Co-mingled mixed commericial and industrial waste</option>
                  <option value="3">Co-mingled mixed construction and demolition waste</option>
                </select>

                <label>Weight</label>
                <input
                  className='userInput'
                  name = "wasteWeight"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.waste}
                />

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>
          </TabPane>

          <TabPane tab={<div className="standardText"> {waterIcon}Water</div>} key="Water">
            <div>    
              <form className='basicForm'>
                
                <label>Water Utility Location</label>
                <select
                  required
                  className = 'userInput'
                  name = "waterUtilityLocation"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
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

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>
          </TabPane>

          <TabPane tab={<div className="standardText"> {paperIcon}Paper</div>} key="Paper">
            <div>    
              <form className='basicForm'>
                
                <label>Source</label>
                <select
                  required
                  className = 'userInput'
                  name = "source"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Domestic</option>
                  <option value="2">Imported</option>
                </select>
                
                <label>Paper Type</label>
                <select
                  required
                  className = 'userInput'
                  name = "paperType"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Recycled</option>
                  <option value="2">Virgin (if paper type unknown)</option>
                </select>

                <label>Weight</label>
                <input
                  className='userInput'
                  name = "paperWeight"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.weight}
                />

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>  
          </TabPane>

          <TabPane tab={<div className="standardText"> {foodAndDrinkIcon}Food And Drink</div>} key="FoodAndDrink">
            <div>    
              <form className='basicForm'>
                
                <label>Food Type</label>
                <select
                  required
                  className = 'userInput'
                  name = "foodType"
                  onChange = {handleEmission}
                >
                  <option value="" disabled selected hidden>Please Select</option>
                  <option value="1">Meat products</option>
                  <option value="2">Eggs</option>
                  <option value="3">Seafood</option>
                  <option value="1">Dairy</option>
                  <option value="2">Bread and cereals</option>
                  <option value="3">Fruit, vegetables and nuts</option>
                  <option value="1">Sugar, packaged meals & confectionary</option>
                  <option value="2">Non-alcoholic drinks</option>
                  <option value="3">Alcoholic take away drinks</option>
                  <option value="2">Take away and dining out</option>
                  <option value="3">TOTAL food and drink</option>
                </select>

                <label>Expenditure</label>
                <input
                  className='userInput'
                  name = "expenditure"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.dollar}
                />

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>  
          </TabPane>

          <TabPane tab={<div className="standardText"> {eventsIcon}Events</div>} key="Events">
            <div>    
              <form className='basicForm'>

                <h2>Accommodation</h2>

                <label>Total Spent on Accommodation</label>   
                <input
                  className='userInput'
                  name = "totalAccommodation"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.dollar}
                />

                <h2>Food And Drink</h2>

                <label>Total Spent on Meals</label>   
                <input
                  className='userInput'
                  name = "totalMeals"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.dollar}
                />

                <label>Total Spent on Non-Alcoholic Drinks</label>   
                <input
                  className='userInput'
                  name = "totalDrinks"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.dollar}
                />
                          
                <h2>Promotional Materials</h2>

                <label>Total Spent on Plastic Products</label>   
                <input
                  className='userInput'
                  name = "totalEventProducts"
                  onChange = {handleEmission}
                  type='number'
                  placeholder={uom.dollar}
                />

                <Button type='primary' className='formButton'>Add</Button>
                                            
              </form>                
            </div>  
          </TabPane> 
                        
          <Layout>
            <Content>
              <Card id="totalCard" title={<h2 id="centreContent">Carbon Report</h2>}>
                
                <div className='standardText'>
                <br />
                Transport: {emission.transportTotal} <br/>
                Electricity: {emission.electricityTotal} <br/>
                Gas: {emission.gasTotal} <br/>
                Waste: {emission.wasteTotal} <br/>
                Water: {emission.waterTotal} <br/>
                Paper: {emission.paperTotal} <br/>
                Food And Drink: {emission.foodAndDrinkTotal} <br/>
                Events: {emission.eventsTotal}</div>
                <br/>

                <h3 className='outputTotal'>Total: {totalEmissions()}t CO<sub>2</sub></h3>

              </Card>
            </Content>
          </Layout>       
        </Tabs>
      </Card>
      
      <div>
        <div class="switchContainer">
          <label class="switch" for="advBasic">
            <input type="checkbox" id="advBasic" name="advBasic" onClick={(e) => {
              handleAdvCalc(e.target.checked);
            }}/>
            <div class="slider round"></div>  
          </label>
          <h3 class='switchLabel'>Advanced</h3>      
        </div>

        <div class="switchContainer">
          <label class="switch" for="uom">
            <input type="checkbox" id="uom" name="uom" onClick={(e) => {
              handleUom(e.target.checked);
            }}/>
            <div class="slider round"></div>  
          </label>
          <h3 class='switchLabel'>Imperial</h3>      
        </div>
        
      </div>
    </div>
  );
}

export default Calculator;
