import {useState, useEffect, useContext} from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card, Button } from "antd";
import '../style.css';
import './carbonBreakdown.css';
import { ReportContext } from "./ReportContext";


const CarbonBreakdown = () => {
    //Add breakdown to start of array.
    //Display breakdown at the start by default.
    //when you click on other reports display those instead.

    /* Carbon Reduction Tips
    Travel
      - Use less impactful fuel sources - Ideally electric + solar
      - Use public transport where possible?
      - Car Pooling?

    Electricity
      - Solar panels
      - Other clean energies
      - Use less electricity??
    Gas
      -
    Water
      - Quicker showers aim for ~4min, maybe use music as a timer.
      - Rainwater??

    Waste
      - Composting.
      - Proper Recycling.
      - Reduce plastic wastes by using more reusable products.
    Paper
      - Dont use paper?
    */

    const { report, setReport } = useContext(ReportContext);

    //Not sure how accurate this is.
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: null,
          },
        ],
      };


      const pie = {
        labels: [
          'Red',
          'Green',
          'Yellow',
        ],
        datasets: [
          {
            data: [300, 50, 100],
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

      const options = {
        // tooltips: {
        //   enabled: false,
        //   custom: customTooltips
        // },
        maintainAspectRatio: false
      }


    return ( 
        <div>
            <div className="column middle">
                
                <Card id="carbonBreakdown" title={<h1>Carbon Breakdown</h1>} bordered={true}>
                  <span className="errorLabel">{report} I am the sickest out</span>
                </Card>
            </div>
            <div className="column right">
                <CChart id="barChart" type="bar" datasets={bar.datasets} options={options} labels="months"/>
                <CChart id="pieChart" type="pie" datasets={pie.datasets} labels={pie.labels} />
            </div>
        </div>
    );
}
export default CarbonBreakdown;
