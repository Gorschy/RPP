import {useState} from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card, Button } from "antd";
import '../style.css';
import './carbonBreakdown.css';


const CarbonBreakdown = () => {
    //Add breakdown to start of array.
    //Display breakdown at the start by default.
    //when you click on other reports display those instead.

    const [barData, setBarData] = useState([]);

    /* Carbon Reduction Tips
    Travel
    Electricity
    Gas
    Water
    Waste
    Paper
    

    */

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
            data: barData,
          },
        ],
      };

      const add = () => {
        let newElement = 7;
        setBarData([...barData, newElement]);
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

      const radar = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ],
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
            <div className="column left">
                <Card id="reportList" title={<h1>List of Reports</h1>} bordered={true}>

                </Card>
            </div>
            <div className="column middle">
                
                <Card id="carbonBreakdown" title={<h1>Carbon Breakdown</h1>} bordered={true}>

                </Card>
            </div>
            <div className="column right">
                <CChart id="barChart" type="bar" datasets={bar.datasets} options={options} labels="months"/>
                <CChart id="radarChart" type="radar" datasets={radar.datasets} labels={radar.labels}/>
                <CChart id="pieChart" type="pie" datasets={pie.datasets} labels={pie.labels} />
            </div>
            <Button className="add" onClick={add} type="primary">add</Button>
        </div>
    );
}
export default CarbonBreakdown;



