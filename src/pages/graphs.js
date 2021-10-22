import { useState, useEffect} from "react";
import { API, graphqlOperation, Auth } from "aws-amplify"; // Used for sending DynamoDB
import { listReports } from "../graphql/queries"; // For creating Reports
import { getUser } from "../graphql/queries";
import {CChart}  from "@coreui/react-chartjs";
import { Card,  } from "antd";
import '../style.css';
import './graphs.css';

const Graphs = (report) => {
    //Not sure how accurate this is. need to update this.
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
      transport: [],
      electricity: [],
      gas: [],
      waste: [],
      water: [],
      paper: [],
      food: []
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


    const options = {
        tooltips: {
        enabled: false,
        custom: ['yeet']
        },
    maintainAspectRatio: false
    };


    useEffect(() => {
        init();
      }, []);

    return ( 
        <div className="column right">
            <CChart id="pieChart" type="pie" datasets={pie.datasets} labels={pie.labels} options={{legend: {display: false}}} />
            <CChart id="barChart" type="bar" datasets={bar.datasets} options={options} labels={pie.labels} />
            <CChart id="lineGraph" type="line" datasets={line.datasets} labels={line.labels} options={options} />
        </div>
    );
}
export default Graphs;
