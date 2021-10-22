import React, { useEffect, useMemo, lazy, Component } from 'react';
import {CCardBody,CCardHeader} from '@coreui/react';
import {FontAwesomeIcon }from "@fortawesome/react-fontawesome";
import { API, graphqlOperation } from 'aws-amplify'; // Used for sending DynamoDB
import {listUsers} from '../graphql/queries'; // For creating Reports
import {Row,Col, Tabs, Collapse, Select, Space, Cascader,AutoComplete, Input, Table } from 'antd';
import {Badge,InputGroup,Modal,Button, Form, FormControl,DropdownButton,Dropdown, Accordion,Card} from 'react-bootstrap';
import './admin.css';
import 'antd/dist/antd.css';

import defProfile from '../assets/default_profile.jpg';
import { faUser, faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import {faEnvira} from '@fortawesome/free-brands-svg-icons' ;
import Pagination from '../components/Pagination';
import Users from '../components/Users';
import { AudioOutlined } from '@ant-design/icons';
import {Pagination as antPage} from 'antd'

import {CChartPie,CChartBar}  from "@coreui/react-chartjs";
import { Tag, Divider } from 'antd';

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
            postsPerPage: 7,
            filter: "email"

        } // Update using setState
    
        //selected 

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
                switch("email") { // Gets Combo box value to determine filter
                    case 'email':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].email != null && users[i].email.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }
                    break;
                    case 'selected phone':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].phone_number != null && users[i].phone_number.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }

                    break;
                    case 'selected fname':
                        for(var i = 0; i < users.length; i++ ){
                            if(users[i].given_name != null && users[i].given_name.toLowerCase().includes(userSearchbar)){
                                filteredUsers.push(users[i]);
                            }
                        }
                        break;
                    case 'selected lname':
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

       handleChange(value) {
  
  this.setState({filter: value});

}
        async componentDidMount(){
            const getData = await API.graphql(graphqlOperation(listUsers, {filter: {admin: {eq: false}, hasRegistered: {eq: true}}})); // Only looking at Users not admins
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

            const handleChange = (value) => {
                console.log(`selected ${value}`);
                this.setState({filter: value});
              
              };
                const handleKeypress = e => {
                    //it triggers by pressing the enter key
                  if (e.charCode == 13) {
                    this.search();
                    console.log("pressed Enter");
                  }
                };
                const { TabPane } = Tabs;
                const { Panel } = Collapse;
                const { Option } = Select;
                const { Search } = Input;
                const onSearch = value => console.log(value); //FIX

              
            return (
                
            
            <>
<Card body>

<br/>
<h1 style={{"textAlign":"center"}}>Administrator Access</h1>

       <div>
       <Row style={{"display":"absolute !important","maxWidth":"1300px","height":"100%","justifyContent":"space-around","overflow":"hidden","padding":"0px 20px 0px","marginLeft":"auto","marginRight":"auto","borderRadius":"15px"}}>
            <Col xs={24} xl={8}>
            <Collapse accordion>
                        <Panel header="User Demographics" key="1">
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
                        </Panel>
                        </Collapse> 
            </Col>
            
            <Col xs={24} xl={8}>
            
                        <Collapse accordion>

                        <Panel header="Carbon Credit Sales" key="2">
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
                        
                        </Panel>
                    </Collapse>   
            </Col>
    </Row> 
    <br/>

    <Row style={{"display":"absolute !important","maxWidth":"1300px","height":"100%","justifyContent":"space-around","overflow":"hidden","padding":"0px 20px 0px","marginLeft":"auto","marginRight":"auto","borderRadius":"15px"}}>
    <Col>
<Row>
<Input.Group compact layout='inline' >
      <Input layout='inline'
        style={{ width: '100%'} }
        placeholder="Search Email"
        options={[{ value: 'text 1' }, { value: 'text 2' }]}
        enterButton  
        id="userSearchInput"
        />
<div style={{"margin":"0 auto","display":"block"}}>
    <Button layout='inline' style={{"background":"#24a0ed", "color":"white"}} onClick={() => this.userClear()} >Clear</Button>

    <Button layout='inline' style={{"borderColor":"var(--color_green)", "color":"white"}} onClick={() => this.search()} >Search</Button>
</div>
        

    </Input.Group>
    </Row>
</Col>
    </Row>

    <br/>

            <table  className="table table-hover table-outline mb-0 d-sm-table" style={{"display":"absolute !important","maxWidth":"2300px", "width":"60%","height":"100%","justifyContent":"space-around","overflow":"hidden","padding":"0px 20px 0px","marginLeft":"auto","marginRight":"auto","borderRadius":"10px","outlineStyle":"solid","outlineWidth":"0.2px","borderColor":"#d8dbe0 !important"
 }}>
                <thead  className="thead-light user-head">
                    <tr>
                        <th className = "text-center"colSpan="8"><h4>Authenticated Users</h4></th>
                    </tr>
                    <tr>
                        <th className="text-center">{userIcon}</th> {/*Profile pics */}
                        <th>Email</th> {/*Emails*/}
                        <th>First Name</th> {/*Fname */}
                        <th>Last Name</th>{/*Lname */}
                        <th>Phone #</th> {/*Phone */}

                    </tr>
                </thead>
                <tbody>
                    {this.state.displayUsers.length === 0 ? <td colSpan="8">No Users can be found!</td>: (<Users users={currentUsers} loading={isLoading}/>)}
                </tbody>
                </table>
            </div>
            <br/>      

            <Pagination style={{"textAlign":"center"}} postsPerPage={postsPerPage} totalPosts={this.state.displayUsers.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage}></Pagination>
       
 

          

</Card>

               </>
        );
        }
    }
    

export default admin;

