import { useState, useEffect } from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card,  } from "antd";
import '../style.css';
import './carbonBreakdown.css';

const CarbonBreakdown = (report) => {

    const [percentageDifference, setPercentageDifference] = useState("Select A Report");
    const [carbonValue, setCarbonValue] = useState("Select A Tab");
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
        'For shorter trips, consider walking, riding or using public transport. Car-pooling is also a great option if you are travelling to the same place as others. ',
        'Plan your public transport journey using Public Transport Victoria or Google Maps for trains, trams and buses.',
        'Find the best cycling route for you using the Google Maps bicycling feature. The map feature will highlight trails, dedicated lanes and bicycle-friendly roads.'
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
        'Most household waste comes from food and garden waste which can be reduced by composting',
        'Implement a compost bin',
        'Worm farms are also another good method of dealing with food wastes',
        'If you live in an apartment or small complex bokashi composting is another method'
      ],
      water: [
        'Reduce your shower time – aim for 4 minutes or less',
        'Change to water-efficient shower heads',
        'Turn taps off when not in use – for example, while brushing your teeth',
        'Fix leaking taps',
        'Use the half-flush on the toilet whenever possible',
        'Scrape excess food from plates and bowls, rather than pre-rinsing',
        'Only run your dishwasher when it is full',
      ],
      paper: [
        'Aim to use recycled paper',
        'When you can instead of using paper record digitally'
      ],
      foodDrink: [
        'Dont waste food',
        'Aim to buy foods and drinks with limited to no plastic',
        'Eat less meat, especially meats like beef',
        'Substitute meats where possible for plant based proteins',
        'Grow your own produce',
        'When buying food aim to buy local produce',
      ],
      events: [
        "Try to only have events every now and then maybe once a month",
        'When you do go out be mindful of what youre purchasing focusing on less plastic, and less meat'
      ]
    };


    useEffect(() => {
      totalCarbon();
    }, []);


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
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.gasCarbon);
      setTipState(tips.gas);
    }

    const paperCarbon = () => {
      let temp = 0;
      temp = report.paperCarbon - carbonAverage.paperCarbon;
      temp = temp/carbonAverage.paperCarbon * 100; 
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.paperCarbon);
      setTipState(tips.paper);
    }

    const transportCarbon = () => {
      let temp = 0;
      temp = report.transportCarbon - carbonAverage.transportCarbon;
      temp = temp/carbonAverage.transportCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.transportCarbon);
      setTipState(tips.transport);
    }

    const wasteCarbon = () => {
      let temp = 0;
      temp = report.wasteCarbon - carbonAverage.wasteCarbon;
      temp = temp/carbonAverage.wasteCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.wasteCarbon);
      setTipState(tips.waste);
    }

    const foodDrinkCarbon = () => {
      let temp = 0;
      temp = report.foodDrinkCarbon - carbonAverage.foodDrinkCarbon;
      temp = temp/carbonAverage.foodDrinkCarbon * 100; 
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.foodDrinkCarbon);
      setTipState(tips.foodDrink);
    }

    const electrictyCarbon = () => {
      let temp=0;
      temp = report.electricityCarbon - carbonAverage.electricityCarbon;
      temp = temp/carbonAverage.electricityCarbon;
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.electricityCarbon);
      setTipState(tips.electricity);
    }

    const waterCarbon = () => {
      let temp = 0;
      temp = report.waterCarbon - carbonAverage.waterCarbon;
      temp = temp/carbonAverage.waterCarbon * 100;
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.waterCarbon);
      setTipState(tips.water);
    }

    const eventsCarbon = () => {
      let temp = 0;
      temp = report.eventsCarbon - carbonAverage.eventsCarbon;
      temp = temp/carbonAverage.eventsCarbon * 100;  
      if(temp > 0){ 
        temp = " +" + temp + " Increase";
      } else {
        temp = + temp + " Decrease";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.eventsCarbon);
      setTipState(tips.events);
    }
  
    return ( 

          <div className="column container">
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

            <Card id="carbonBreakdown" title={<h1>Carbon Reduction Tips</h1>} bordered={true}>
            { tipState.map((item, index) => (
                        <div key = {index}>
                            <p>{item}</p>
                        </div>
                    ))}
            </Card>
          </div>
    );
}
export default CarbonBreakdown;
