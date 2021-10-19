import {useState, useEffect} from "react";
import {CChart}  from "@coreui/react-chartjs";
import { Card } from "antd";
import '../style.css';
import './profile.css';
import { API, graphqlOperation, Auth } from "aws-amplify"; // Used for sending DynamoDB
import { listReports } from "../graphql/queries"; // For creating Reports
import CarbonBreakdown from './carbonBreakdown.js';// Child component
import Graphs from './graphs.js';//Child component
import { getUser } from "../graphql/queries";



const Profile = () => {

    const [allReports, setAllReports] = useState([]); //Used to store all carbon reports related to the logged in user.
    const [selectedReport, setSelectedReport] = useState({}); //Used to store a selected carbon report.
   
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

      }catch(e){
        console.error("Error in profile.js report method: ", e)
      }
    };

  
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
            <Graphs {...selectedReport} />
        </div>
    );
}
export default Profile;



