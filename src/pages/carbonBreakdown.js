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
        </div>
    );
}
export default CarbonBreakdown;
