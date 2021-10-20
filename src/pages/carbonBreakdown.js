import { useState, useEffect } from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card,  } from "antd";
import '../style.css';
import './carbonBreakdown.css';

const CarbonBreakdown = (report) => {

    const [percentageDifference, setPercentageDifference] = useState("Loading");
    const [carbonValue, setCarbonValue] = useState("Loading");
    const [tipState, setTipState] = useState([]);

    //Not sure how accurate this is. need to update this.
    const carbonAverage = {
      totalCarbon: 17,
      transportCarbon: 2.89,
      electricityCarbon: 2.04,
      gasCarbon: 0.85,
      wasteCarbon: 0.51,
      waterCarbon: 0.85,
      paperCarbon: 0.41,
      foodDrinkCarbon: 0.51,
      eventsCarbon: 0.89 
    };

    const tips = {
      total: [
        "Temp data total tips"
      ],
      transport: [
        "Temp data transport tips"
      ],
      electricity: [
        'During the colder months, wear more clothing layers to keep warm before turning on the heater', 
        'Set your air conditioner to 25 to 27°C for cooling in summer', 
        'Set your heater to 18 to 20°C for warming in winter',
        'Keep appliances that need constant power connected to one plug. Turn off other appliances at the wall when not in use',
        'Remove one globe from multi-globe fittings and turn off lights when you leave the room'
      ],
      gas: [
        "Temp data gas tips"
      ],
      waste: [
        "Temp data waste tips"
      ],
      water: [
        "Temp data water tips"
      ],
      paper: [
        "Temp data paper tips"
      ],
      foodDrink: [
        "Temp data foodDrink tips"
      ],
      events: [
        "Temp data events tips"
      ]
    };


    //Onclick for each button
    const totalCarbon = () => {
      let temp = 0;
      temp = report.totalCarbon - carbonAverage.totalCarbon;
      temp = temp/carbonAverage.totalCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.totalCarbon);
      setTipState(tips.total);
    }

    const gasCarbon = () => {
      let temp = 0;
      temp = report.gasCarbon - carbonAverage.gasCarbon;
      temp = temp/carbonAverage.gasCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.gas);
      setCarbonValue(report.gasCarbon);
      setTipState(tips.gas);
    }

    const paperCarbon = () => {
      let temp = 0;
      temp = report.paperCarbon - carbonAverage.paperCarbon;
      percentDiff.paper = temp/carbonAverage.paperCarbon * 100; 
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.paper);
      setCarbonValue(report.paperCarbon);
      setTipState(tips.paper);
    }

    const transportCarbon = () => {
      let temp = 0;
      temp = report.transportCarbon - carbonAverage.transportCarbon;
      percentDiff.transport = temp/carbonAverage.transportCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.transport);
      setCarbonValue(report.transportCarbon);
      setTipState(tips.transport);
    }

    const wasteCarbon = () => {
      let temp = 0;
      temp = report.wasteCarbon - carbonAverage.wasteCarbon;
      percentDiff.waste = temp/carbonAverage.wasteCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.waste);
      setCarbonValue(report.wasteCarbon);
      setTipState(tips.waste);
    }

    const foodDrinkCarbon = () => {
      let temp = 0;
      temp = report.foodDrinkCarbon - carbonAverage.foodDrinkCarbon;
      percentDiff.foodDrink = temp/carbonAverage.foodDrinkCarbon * 100; 
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.foodDrink);
      setCarbonValue(report.foodDrinkCarbon);
      setTipState(tips.foodDrink);
    }

    const electrictyCarbon = () => {
      let temp=0;
      temp = report.electricityCarbon - carbonAverage.electricityCarbon;
      percentDiff.electricity = temp/carbonAverage.electricityCarbon;
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.electricity);
      setCarbonValue(report.electricityCarbon);
      setTipState(tips.electricity);
    }

    const waterCarbon = () => {
      let temp = 0;
      temp = report.waterCarbon - carbonAverage.waterCarbon;
      percentDiff.water = temp/carbonAverage.waterCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.water);
      setCarbonValue(report.waterCarbon);
      setTipState(tips.water);
    }

    const eventsCarbon = () => {
      let temp = 0;
      temp = report.eventsCarbon - carbonAverage.eventsCarbon;
      percentDiff.events = temp/carbonAverage.eventsCarbon * 100;  
      if(temp > 0){ 
        temp = " +" + temp;
      }else{
        temp = " -" + temp;
      }
      setPercentageDifference(percentDiff.events);
      setCarbonValue(report.eventsCarbon);
      setTipState(tips.events);
    }

    
   
   
    return ( 

          <div className="column">
            <Card className="card" bordered={true}>
            <div className="column">
                <div className="btn-group">
                  <button onClick={totalCarbon}>Total</button>
                  <button onClick={transportCarbon}>Transport</button>
                  <button onClick={electrictyCarbon}>Electricity</button>
                </div>
              </div>
              <div className="column">
                <div className="btn-group">
                  <button onClick={gasCarbon}>Gas</button>
                  <button onClick={wasteCarbon}>Waste</button>
                  <button onClick={waterCarbon}>Water</button>
                </div>
                </div>
                <div className="column">
                <div className="btn-group">
                  <button onClick={paperCarbon}>Paper</button>
                  <button onClick={foodDrinkCarbon}>Food And Drink</button>
                  <button onClick={eventsCarbon}>Events</button>
                </div>
                </div>
                <p>Carbon Report Amount {carbonValue}</p>
                <p>Comapred To Average {percentageDifference}</p>
            </Card>

            <Card id="carbonBreakdown" title={<h1>Carbon Breakdown</h1>} bordered={true}>
            { tipState.map((item, index) => (
                        <div key = {index}>
                            <a>{item}</a>
                        </div>
                    ))}
            </Card>
          </div>
    );
}
export default CarbonBreakdown;
