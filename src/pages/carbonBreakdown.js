import {CChart}  from "@coreui/react-chartjs";
import { Card,  } from "antd";
import '../style.css';
import './carbonBreakdown.css';

const CarbonBreakdown = (report) => {

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
      transport: [],
      electricity: [],
      gas: [],
      waste: [],
      water: [],
      paper: [],
      food: []
    };
   
    const bar = {
        labels: ['Total Carbon', 'Transport Emissions', 'Electricity Emissions', 'Gas Emissions', 'Waste Emissions', 'Water Emissions', 'Paper Emissions', 'Food & Drink Emissions', 'Events Emissions'],
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

      const options = {
         tooltips: {
          enabled: false,
           custom: ['yeet']
         },
        maintainAspectRatio: false
      }

    return ( 
        <div>
            <div className="column middle">
                <Card id="carbonBreakdown" title={<h1>Carbon Breakdown</h1>} bordered={true}>
                  <span className="errorLabel">
                    {JSON.stringify(report.totalCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.transportCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.electricityCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.gasCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.wasteCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.waterCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.paperCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.foodDrinkCarbon)}
                  </span>
                  <div class="divider div-transparent"></div>
                  <span className="errorLabel">
                    {JSON.stringify(report.eventsCarbon)}
                  </span>
                </Card>
            </div>
            <div className="column right">
                <CChart id="barChart" type="bar" datasets={bar.datasets} options={options} labels={pie.labels}/>
                <CChart id="pieChart" type="pie" datasets={pie.datasets} labels={pie.labels} />
            </div>
        </div>
    );
}
export default CarbonBreakdown;
