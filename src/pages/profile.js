import {useState, useEffect} from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card } from "antd";
import '../style.css';
import './profile.css';
import { API, graphqlOperation, Auth } from "aws-amplify"; // Used for sending DynamoDB
import { listReports } from "../graphql/queries"; // For creating Reports
import CarbonBreakdown from './carbonBreakdown.js';// Child component
import { getUser } from "../graphql/queries";



const Profile = () => {

    const [allReports, setAllReports] = useState([]); //Used to store all carbon reports related to the logged in user.
    const [selectedReport, setSelectedReport] = useState({}); //Used to store a selected carbon report.
    const [totalCarbonArray, setTotalCarbonArray] = useState([]); //Used to store all total carbon individually accross all reports.
    const [dateArray, setDateArray] = useState([]); //Used to store all dates accross all reports.

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

        setAllReports(getData.data.listReports.items);
        setAnalyticsData(getData.data.listReports.items);

      }catch(e){
        console.error("Error in profile.js report method: ", e)
      }
    };

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
  }
    
    const log = () => {
        console.log(dateArray);
        console.log(totalCarbonArray);
    }

    const submit = (item) => {

      const tempReport = allReports.filter(obj => { if(obj.id === item.target.id) return obj });
      setSelectedReport(...tempReport);
      //weird champ
      console.log(...tempReport);
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
          <CChart type="line" datasets={line.datasets} options={options} />
          <button onClick={setAnalyticsData}>Test</button>
            <div className="column left">
                <Card id="reportList" title={<h1>List of Reports</h1>} bordered={true}>   
                { allReports.map((item, index) => (
                        <div key = {index}>
                            <a onClick= {submit.bind(item)} id = {item.id}>{item.date}</a>
                        </div>
                    ))}

                </Card>
                
            </div>
              <CarbonBreakdown {...selectedReport} />
        </div>
    );
}
export default Profile;



