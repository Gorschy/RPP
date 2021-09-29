import '../../style.css';
import './projects.css';
import placeholderImg from '../../assets/plant.jpg'
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router'
import { Auth } from 'aws-amplify';
import { List } from 'antd';

const Projects = () => { 
    
    
    //const [currentUser, setUser] = useState({});
    //const [usersProjects, setProjects] = useState([]);
    
    /* ----------------------- */
    /*

    useEffect(() => {
        getCurrentUser();
        
    }, []);

    const getCurrentUser = async () => {
        //Capture current authed user
        let user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        
        for(let i = 0; i < users.length; i++) {
            if(users[i].id === attributes.sub) {
                setUser(users[i]);
                //getProjects(currentUser);
                console.log(currentUser);
            }
        }
    }

    const getProjects = async (user) => {
        
        
        console.log(users);
    }
    */
    
    useEffect(() => {
        checkUser();
    },[]);
    
    const {loggedIn} = useContext(UserContext);
    const [loggedUser, setLoggedUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    //const [userProjects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);
      
    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { ...data.attributes };            
            setLoggedUser(userInfo);
            
            setLoading(false);
            console.log(loggedUser);

        } catch (err) { 
            console.log('error: ', err);
        }
    }

     /* ------ Mock Data ------ */
    /*
    const current_user_carbon_reports = [
        {
            id: 1,
            created_by: currentUser.sub,
            //creation_date: ,
            //emission_data: something
        },
        {
            id: 2,
            created_by: currentUser.sub,
            //creation_date: ,
            //emission_data: something
        },
        {
            id: 3,
            created_by: currentUser.sub,
            //creation_date: ,
            //emission_data: something
        }
    ]
    */
    
    const users = [
        {
            id: '7644f96b-4636-40d4-9422-505fcfff35d9',
            email: 'bb923@uowmail.edu.au',
            first_name: 'Brandon',
            last_name: 'Britton',
            projects_list: [1,3,5],
            //carbon_reports: [1]
        },
        {
            id: '1',
            email: 'a@a.com',
            first_name: 'A',
            last_name: 'a',
            projects_list: [1,2,3,4,5],
            //carbon_reports: [1]
        },
        {
            id: '2',
            email: 'b@b.com',
            first_name: 'B',
            last_name: 'b',
            projects_list: [3,4,5],
            //carbon_reports: [1,2]
        },
        {
            id: '3',
            email: 'c@c.com',
            first_name: 'C',
            last_name: 'c',
            projects_list: [4,5],
            //carbon_reports: [1,2,3]
        },
    ]
    
    const projects = [
        {
            id: 1,
            name: 'Current User Project1',
            description: '1',
            creation_date: '',
            admin_user: '7644f96b-4636-40d4-9422-505fcfff35d9',
            users: ['7644f96b-4636-40d4-9422-505fcfff35d9','1'],
            //carbon_reports: [],
            //total_report: ''
        },
        {
            id: 2,
            name: 'Not Current Users Project1',
            description: '2',
            creation_date: '',
            admin_user: '',
            users: [],
            //carbon_reports: [],
            //total_report: ''
        },
        {
            id: 3,
            name: 'Current User Project2',
            description: '3',
            creation_date: '',
            admin_user: '1',
            users: ['7644f96b-4636-40d4-9422-505fcfff35d9','1','2'],
            //carbon_reports: [],
            //total_report: ''
        },
        {
            id: 4,
            name: 'Not Current Users Project2',
            description: '4',
            creation_date: '',
            admin_user: '',
            users: [],
            //carbon_reports: [],
            //total_report: ''
        },
        {
            id: 5,
            name: 'Current User Project3',
            description: '5',
            creation_date: '',
            admin_user: '3',
            users: ['7644f96b-4636-40d4-9422-505fcfff35d9','1','2','3'],
            //carbon_reports: [],
            //total_report: ''
        }
    ];

    return (
    
        <div>
            { 
                loggedIn ? (
                    
                    <div className='container'>
                        { isLoading && console.log('loading...') }
                        <div className='column'>
                            
                            <div id='projectListCard'>
                                <h3 className='centerContent'>Projects</h3>
                                <List
                                    id="projectListID"
                                    itemLayout="horizontal"
                                    dataSource={ projects }
                                    renderItem={ item => (        
                                        <List.Item>
                                            <List.Item.Meta title={ <a>{ item.name }</a> } />
                                        </List.Item>
                                    )}
                                /> 
                                
                            </div>

                            <div id='carbonReportListCard'>
                                <h3 className='centerContent'>Carbon Reports</h3>
                            </div>
                            
                        </div> 
                        <div className='column'>
                            
                            <div className='projectAnalytics'>
                                <h3>Project Summary</h3>
                            </div>
                            
                            <div className='projectBreakdown'>
                                <h3>Project Breakdown</h3>
                                
                            </div>

                        </div>
                        <div className='column'>
                            
                            <div id='projectAdminCard'>
                                <h4 className='projectAdminHead'>Project Admin</h4>
                                <img className='adminPicture' src={placeholderImg} alt='Display Picture' />
                            </div>

                            <div id='membersList'>
                                <div className='teamMember'>
                                    <img className='teamMemberPicture' src={placeholderImg} alt='Display Picture' />
                                    <h5 className='teamMemberLabel'>{currentUser.first_name} {currentUser.last_name}</h5><br/>
                                    <h5 className='teamMemberLabel'>{currentUser.email}</h5>
                                </div>
                            </div>

                        </div> 
                        
                    </div>

                ) : ( <Redirect to="/home"/> ) 
            } 
        </div>
        
    );
}

export default Projects;