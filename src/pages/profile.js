import {useState, useEffect} from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card, Button } from "antd";
import '../style.css';
import './profile.css';
import CarbonBreakdown from './carbonBreakdown.js';
import { ReportContext } from './ReportContext';
const Profile = () => {
    //Add breakdown to start of array.
    //Display breakdown at the start by default.
    //when you click on other reports display those instead.

    const [fakeReports, setFakeReports] = useState([
      {
        totalCarbon: 342,
        transportCarbon: 111,
        electricityCarbon:  223,
        gasCarbon: 405,
        wasteCarbon: 141,
        waterCarbon: 6778,
        paperCarbon: 1321,
        foodDrinkCarbon: 3,
        eventsCarbon: 1,
        date: '25/11/1997'

      }, 
      {
        totalCarbon: 1,
        transportCarbon: 1,
        electricityCarbon:  1,
        gasCarbon: 1,
        wasteCarbon: 1,
        waterCarbon: 1,
        paperCarbon: 1,
        foodDrinkCarbon: 1,
        eventsCarbon: 1,
        date: '1/05/1997'
      },  
      {
        totalCarbon: 2,
        transportCarbon: 2,
        electricityCarbon:  2,
        gasCarbon: 2,
        wasteCarbon: 2,
        waterCarbon: 2,
        paperCarbon: 2,
        foodDrinkCarbon: 2,
        eventsCarbon: 2,
        date: '19/11/1997'
      }  
    ]);

    const [report, setReport] = useState();

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

    useEffect(() => {
      init()
    }, []);

    const init = () => {
      for(let i = 0; i<fakeReports.length; i++){
        let btn = document.createElement("button");
        btn.innerHTML = "Carbon Report " + fakeReports[i].date;//Need to concac date from carbonReport Object
        btn.onclick = submit;//
        btn.id = "reportButton";
        btn.value = i;
        document.getElementById("reportList").appendChild(btn);
        console.log(btn);
      }
    };

    const submit = () => {
      console.log(fakeReports[0]);
      let temp = fakeReports[0];
      setReport(temp);
    };

    return ( 
        <div>
          <button onClick={init}>Test</button>
            <div className="column left">
                <Card id="reportList" title={<h1>List of Reports</h1>} bordered={true}>
                
                </Card>
                
            </div>
            <ReportContext.Provider value={{ report, setReport }}>
              <CarbonBreakdown>
              </CarbonBreakdown>
            </ReportContext.Provider>
        </div>
    );
}
export default Profile;



