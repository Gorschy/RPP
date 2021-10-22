import { useState, useEffect } from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card,  } from "antd";
import '../style.css';
import './carbonBreakdown.css';
import './graphs.css';
//import './graphs.css';
import { API, graphqlOperation, Auth } from "aws-amplify"; // Used for sending DynamoDB
import { listReports } from "../graphql/queries"; // For creating Reports
import { getUser } from "../graphql/queries";

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


    const [totalCarbonArray, setTotalCarbonArray] = useState([]); //Used to store all total carbon individually accross all reports.
    const [dateArray, setDateArray] = useState([]); //Used to store all dates accross all reports.


    const setAnalyticsData = (reports) => {

      console.log("Hello From Set Analytics");
      const tempDates = [];
      const tempTotals = [];

      for(let i = 0; i < reports.length; i++) {
          
          tempDates.push(reports[i].date);
          tempTotals.push(reports[i].totalCarbon);

          console.log(i);

      }
      setTotalCarbonArray(tempTotals);
      setDateArray(tempDates);
    };

    const init = async () => {
      try{
        await Auth.currentUserInfo().then((userInfo) => {
          if(userInfo == null){ // If not signed in head to login page
            localStorage.setItem('calculate_data','true') // Add to local storage. And will be removed when user is tasken to Carbon reports
           // history.push('login');
          }
        })   
        // If the user is still here they must be logged in 
        // thus we send the data to DB
    
        const data = await Auth.currentUserPoolUser();
        const userInfo = { ...data.attributes };

        const getData = await API.graphql(graphqlOperation(listReports, {filter: {userID: {eq: userInfo.sub}}})); 
        console.log(getData.data.listReports.items);


        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.sub }));
        console.log(userData);
        setAnalyticsData(getData.data.listReports.items);

      }catch(e){
        console.error("Error in profile.js report method: ", e)
      }
    };

    const tips = {
      total: [
        'That largest contributors to your carbon footprint come from Energy, Agriculture, Waste, Land Alteration and Industrial Processing. Land Alteration and Industrial Processing cannot be impacted by an individual',
        'As such to improve your carbon emission focus on reducing your energy, agricultural and waste impacts',
        'This can be achieved through the following',
        'Try to use less heating or cooling where possible instead aim to dress for the weather',
        'Implementing solar or another renewable energy as your source will benefit your carbon footprint greatly',
        'Consume local produce and reduce meat consumption especially meats like beef',
        'Implement waste reduction methods like composting',
        'When purchasing products look for less plastic packagaging'
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
        'Heat your home selectively',
        'Adjust your thermostat (or buy a new one)',
        'Reduce hot water use',
        'Switch to an instantaneous hot water system',
        'Insulate your home',
        'Replace your dishwasher and washing machine',
        'Close curtains & doors',
        'Layer up',
        'Don’t preheat the oven',
        'Get a better energy plan',
        'Go Solar'
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


    const bar = {
      labels: ['Total Carbon', 'Transport', 'Electricity', 'Gas', 'Waste', 'Water', 'Paper', 'Food & Drink', 'Events'],
      datasets: [
        {
          label: 'Carbon Average',
          backgroundColor: 'rgb(154,208,245,0.2)',
          borderColor: 'rgb(130,205,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(130,205,255,0.4)',
          hoverBorderColor: 'rgba(130,205,255,1)',
          data: [
            carbonAverage.totalCarbon, 
            carbonAverage.transportCarbon, 
            carbonAverage.electricityCarbon, 
            carbonAverage.gasCarbon, 
            carbonAverage.wasteCarbon, 
            carbonAverage.waterCarbon, 
            carbonAverage.paperCarbon, 
            carbonAverage.foodDrinkCarbon,
            carbonAverage.eventsCarbon
          ],
        },
        {
          label: 'Your Emissions',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [              
            report.totalCarbon, 
            report.transportCarbon, 
            report.electricityCarbon, 
            report.gasCarbon, 
            report.wasteCarbon, 
            report.waterCarbon, 
            report.paperCarbon, 
            report.foodDrinkCarbon,
            report.eventsCarbon
          ],
        },
      ], 
      
    };
    
    const pie = {
      labels: ['Transport', 'Electricity', 'Gas', 'Waste', 'Water', 'Paper', 'Food & Drink', 'Events'],
      datasets: [
        {
          data: [
            report.transportCarbon, 
            report.electricityCarbon, 
            report.gasCarbon, 
            report.wasteCarbon, 
            report.waterCarbon, 
            report.paperCarbon, 
            report.foodDrinkCarbon,
            report.eventsCarbon],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        }],
    };

  //Line Graph Inputs
  const line = {
      labels: dateArray,
      datasets: [
      {
          label: 'Total Carbon Over Time',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: totalCarbonArray,
      },
      ],
  };

  useEffect(() => {
      init();
    }, []);



    useEffect(() => {
      totalCarbon();
    }, []);


    //Onclick for each button
    const totalCarbon = () => {
      let temp = 0;
      temp = report.totalCarbon - carbonAverage.totalCarbon;
      temp = temp/carbonAverage.totalCarbon * 100;
      if(temp > 0){ 
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
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
        temp = " +" + parseInt(temp).toString() + "%";
      } else {
        temp = + parseInt(temp).toString() + "%";
      }
      setPercentageDifference(temp);
      setCarbonValue(report.eventsCarbon);
      setTipState(tips.events);
    }
    
    
    const options = {
      tooltips: {
      enabled: true,
      },
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    };

    return (
      
      <div className="containerr">
        
        <div className="profcard" >
 
            <div className = "col">
              <h1>Carbon Breakdown</h1>
            
              <div className = "flex-container">

    
                <div className = "flex-child">  
                  <div className = "btn-group">
                    <button onClick={totalCarbon}>Total</button>
                    <button onClick={transportCarbon}>Transport</button>
                    <button onClick={electrictyCarbon}>Electricity</button>
                    <button onClick={gasCarbon}>Gas</button>
                    <button onClick={wasteCarbon}>Waste</button>
                    <button onClick={waterCarbon}>Water</button>
                    <button onClick={paperCarbon}>Paper</button>
                    <button onClick={foodDrinkCarbon}>Food And Drink</button>
                    <button onClick={eventsCarbon}>Events</button>
                  </div>
                </div>


                <div className = "flex-child">
                  <h3>Carbon Report Total: {carbonValue}t CO2</h3>
                  <h3>Comapred To Average: {percentageDifference}</h3><br/>
                  <h2>Carbon Reduction Tips</h2>
                  <ul className = "listt">
                    { tipState.map((item, index) => (
                      <li className = "tips" key = {index}>
                          <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                

                <div className = "flex-child">
                  <CChart className="pieChart" type="pie" datasets={pie.datasets} labels={pie.labels} options={options} />
                  <CChart className="barChart" type="bar" datasets={bar.datasets} options={options} labels={bar.labels} />
                  <CChart className="lineGraph" type="line" datasets={line.datasets} labels={line.labels} options={options} />
                </div>
              </div>          
           </div>  

        </div>
      </div>
      
    );
}
export default CarbonBreakdown;
