import React, { useEffect, useMemo, lazy, Component } from 'react';
import {CCardBody,CCardHeader} from '@coreui/react';
import './admin.css';
import {FontAwesomeIcon }from "@fortawesome/react-fontawesome";

import { API, graphqlOperation } from 'aws-amplify'; // Used for sending DynamoDB
import {listUsers} from '../graphql/queries'; // For creating Reports
import {Row,Col,Badge,InputGroup,Modal,Button, Form, FormControl,DropdownButton,Dropdown, Tabs, Tab, Accordion,Card} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';

import defProfile from '../assets/default_profile.jpg';
import { faUser, faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import {faEnvira} from '@fortawesome/free-brands-svg-icons' ;
import Pagination from '../components/Pagination';
import Users from '../components/Users';

import {CChartPie,CChartBar}  from "@coreui/react-chartjs";

/*
To-Do: 
- Is hidden to non-admin

*/

const worldIcon = <FontAwesomeIcon  icon={faGlobeAsia} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const enviroIcon = <FontAwesomeIcon icon={faEnvira}/>
//var userSearchInput = document.getElementById("userSearchInput");
//var userFilter =  document.getElementById("userFilter");

class admin extends Component {
    constructor(props) {
        super(props)
        this.deleteInput = null;
      }
    
    getBadge = status => {
        switch (status) {
          case 'New': return 'success'
          case 'Reoccuring': return 'primary'
        }
      }
      

    //like eternal memory
        state = {
            isLoading: false,
            users:[  ], // list of users
            displayUsers:[ ],
            show: false, // Showing Modal
            user: "", //Delete Modal - User ID
            validated: true, // Delete Modal - Checking Input of UserDeleteInput
            currentPage: 1,
            postsPerPage: 7

        } // Update using setState
    
        

        async userClear(){
            this.setState({displayUsers: this.state.users, isLoading:false});
            document.getElementById("userSearchInput").value = "";
        }
        async search(){
            var userSearchbar = document.getElementById("userSearchInput").value;
            userSearchbar = userSearchbar.toLowerCase(); //converts to lower case
            
            if(userSearchbar.replace(/ /g,'') != ""){
                const users = this.state.users;
                const filteredUsers = [];

                switch(document.getElementById("userFilter").value) { // Gets Combo box value to determine filter
                    case 'email':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].email != null && users[i].email.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }
                    break;
                    case 'phone':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].phone_number != null && users[i].phone_number.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }

                    break;
                    case 'fname':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].given_name != null && users[i].given_name.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }
                        break;
                    case 'lname':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].family_name != null && users[i].family_name.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }
                        break;
                    default:
                        console.error("Error in User search combobox");
                        return null;
                }                                

                    //body = getData.data.listUsers.items;
                    this.setState({displayUsers: filteredUsers, isLoading:false});
        
                }
        }

      
        async componentDidMount(){
            const getData = await API.graphql(graphqlOperation(listUsers, {filter: {admin: {eq: false}}})); // Only looking at Users not admins
            const body = getData.data.listUsers.items;
            this.setState({users: body, displayUsers: body, isLoading:false});
            document.getElementById("userSearchInput").value = "";
        }


 
        render() {
            const isLoading = this.state.isLoading;
            const allusers = this.state.displayUsers;
            const {currentPage, postsPerPage} = this.state;

            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const currentUsers = allusers.slice(indexOfFirstPost, indexOfLastPost);


            if(isLoading)
                return(<div>loading...</div>)
            var ctr = 0;
            // For every single invoice use this
                 
                     // const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

          const paginate = pageNum => this.setState({currentPage:pageNum});
                const nextPage = () => this.setState({currentPage:currentPage+1});
                const prevPage = () => this.setState({currentPage:currentPage-1});


                const handleKeypress = e => {
                    //it triggers by pressing the enter key
                  if (e.charCode == 13) {
                    this.search();
                    console.log("pressed Enter");
                  }
                };
            return (
                
            
            <>
<Card body>

<br/>
<h1>Administrator Access</h1>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="profile" title="Users">
            <div className="admin-container">
            <Row md={1} lg={2}>
            <Accordion defaultActiveKey="0">
                <Col>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <CCardHeader>
                                {worldIcon} User Demographics 
                            </CCardHeader>
                        </Accordion.Header>
                        <Accordion.Body>
                            <CCardBody>
                                <CChartPie
                                    datasets={[
                                    {
                                        backgroundColor: [
                                        '#00D8FF',
                                        '#E46651',
                                        '#41B883',
                                        '#DD1B16'
                                        ],
                                        data: [40, 20, 80, 10]
                                    }
                                    ]}
                                    labels={['New Zealand', 'Indonesia', 'Australia', 'Japan']}
                                    options={{
                                        animation: {
                                            duration : 0
                                        },
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                />
                                </CCardBody>
                        </Accordion.Body>
                    </Accordion.Item>
                
                </Col>
            </Accordion>

            <Accordion defaultActiveKey="1">
                <Col>
                    <Accordion.Item eventKey="1">
                
                        <Accordion.Header>
                            <CCardHeader>
                                {enviroIcon} Carbon Credit Sales 
                            </CCardHeader>
                        </Accordion.Header>
                        <Accordion.Body>
                            <CCardBody>
                                <CChartBar
                                    datasets={[
                                    {
                                        label: 'Carbon Credits 2020',
                                        backgroundColor: '#f87979',
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                                    },
                                    {
                                        label: 'Carbon Credits 2021',
                                        backgroundColor: '#66c7ce',
                                        data: [22, 33, 11, 2, 40, 12, 19, 21, 54, 11, 42, 23]
                                    }
                                    ]}
                                    labels="months"
                                    options={{
                                        animation: {
                                        duration : 0
                                    },
                                    tooltips: {
                                        enabled: true
                                    }
                                    }}
                                    
                                />
                            </CCardBody>
                        </Accordion.Body>

                
                </Accordion.Item>
                </Col>
            </Accordion>

            </Row>
        </div>

            <br/>






            <InputGroup className="search-bar mb-3 dropdown">
                <Form.Select id="userFilter" className="combo-box" aria-label="Default select example">
                    <option value="email">Email</option>
                    <option value="fname">First Name</option>
                    <option value="lname">Last Name</option>
                    <option value="phone">Phone</option>

                </Form.Select>
                <FormControl
                id="userSearchInput"
                //ref={c => {this.userSearchInput = c}}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onKeyPress={handleKeypress}
                />
                <Button onClick={() => this.userClear()} variant="outline-secondary"> Clear</Button>

                <Button onClick={() => this.search()} variant="primary"> Search</Button>
            </InputGroup> 

    <div className = "admin-container fluid center"> 
        <div className="row">
            <table className="table table-hover table-outline mb-0 d-sm-table">
                <thead className="thead-light user-head">
                    <tr>
                        <th className = "text-center"colSpan="8"><h4>Authenticated Users</h4></th>
                    </tr>
                    <tr>
                        <th className="text-center">{userIcon}</th> {/*Profile pics */}
                        <th>Email</th> {/*Emails*/}
                        <th>First Name</th> {/*Fname */}
                        <th>Last Name</th>{/*Lname */}
                        <th>Phone #</th> {/*Phone */}
                        <th>Activity</th> {/*Last online */}
                        <th className="text-center" colSpan="2">Actions</th> 

                    </tr>
                </thead>
                <tbody>
                    {this.state.displayUsers.length === 0 ? <td colSpan="8">No Users can be found!</td>: (<Users users={currentUsers} loading={isLoading}/>)}
                </tbody>
                </table>
            </div>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={this.state.displayUsers.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage}></Pagination>

        </div>
        
</Tab> 

    <Tab eventKey="2" title="Offset Solutions">
        <div className="admin-container">
        Total Solutions (COUNT) (Pie Graph)
      Broken up by;
      - Finished Solutions
      - Solutions in Progress
      - Solutions Seeking Funding
      - Draft Solutions

      Type of Solutions (Donught)
      - Water
      - ETC

    Solutions Locations (pie)
    - Australia
    - etc


    table
    Picture | Title | Type | Location | Started Date | End Date | Total Raised | Goal (Progress Bar) | Users backing (Count) - [blue=View | green=Edit | red=Delete]
    
    paginate
        </div>
   
  </Tab>

 
</Tabs>
              
</Card>

               </>
        );
        }
    }
    

export default admin;
