import "../../style.css";
import "./projects.css";
import placeholderImg from "../../assets/plant.jpg"
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router"
import { Auth, API, graphqlOperation } from "aws-amplify";
import { List, Modal } from "antd";
import {getUser} from '../../graphql/queries';

/* MOCK DATA TESTING (ignore)
--------------------------------------------------------------------------------- */

const users = [
    {
        id: "036f3547-e001-467f-9a82-7095c9bff202",
        email: "bb923@uowmail.edu.au",
        first_name: "Brandon",
        last_name: "Britton",
        projects_list: [1, 3, 5],
        pending_invites: [6,7]
        //carbon_reports: [1]
    },
    {
        id: "1",
        email: "a@a.com",
        first_name: "A",
        last_name: "a",
        projects_list: [1, 2, 3, 4, 5],
        pending_invites: []
        //carbon_reports: [1]
    },
    {
        id: "2",
        email: "b@b.com",
        first_name: "B",
        last_name: "b",
        projects_list: [3, 4, 5],
        pending_invites: []
        //carbon_reports: [1,2]
    },
    {
        id: "3",
        email: "c@c.com",
        first_name: "C",
        last_name: "c",
        projects_list: [4, 5],
        pending_invites: []
        //carbon_reports: [1,2,3]
    },
];

const projects = [
    {
        id: 1,
        name: "Current User Project1",
        description: "1",
        creation_date: "",
        admin_user: "036f3547-e001-467f-9a82-7095c9bff202",
        users: ["036f3547-e001-467f-9a82-7095c9bff202", "1"],
        //carbon_reports: [],
        //total_report: "
    },
    {
        id: 2,
        name: "Not Current Users Project1",
        description: "2",
        creation_date: "",
        admin_user: "",
        users: [],
        //carbon_reports: [],
        //total_report: "
    },
    {
        id: 3,
        name: "Current User Project2",
        description: "3",
        creation_date: "",
        admin_user: "1",
        users: ["036f3547-e001-467f-9a82-7095c9bff202", "1", "2"],
        //carbon_reports: [],
        //total_report: "
    },
    {
        id: 4,
        name: "Not Current Users Project2",
        description: "4",
        creation_date: "",
        admin_user: "",
        users: [],
        //carbon_reports: [],
        //total_report: "
    },
    {
        id: 5,
        name: "Current User Project3",
        description: "5",
        creation_date: "",
        admin_user: "3",
        users: ["036f3547-e001-467f-9a82-7095c9bff202", "1", "2", "3"],
        //carbon_reports: [],
        //total_report: "
    }
];

const carbonreports = [

];

function GetUserData() {
    
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setLoading] = useState(false);

    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { ...data.attributes };
            const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.sub }));
            setCurrentUser(userData.data.getUser);
        } catch (err) {
            console.log("error: ", err);
        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return [currentUser, isLoading];
}

function GetProjects(currentUser) {
    
    const userData = users.filter(obj => { if(obj.id === currentUser.id) return obj.projects_list });
    const tempList = userData[0].projects_list
    const projectsList = []; 

    for(let i = 0; i < tempList.length; i++){
        const temp = projects.filter(obj => {
            if(obj.id === tempList[i]) return obj;
        });
        projectsList.push(...temp);
    }
    
    return projectsList
}


const UserLists = (currentUser) => {

    // modal state control
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    
    // new project state control
    const [projectVars, setProjectVars] = useState({});
    const [newProject, setNewProject] = useState({});

    const generateProjectID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProjectVars(prevState => (
            { ...prevState, [name]: value }
        ));
    }

    const handleSubmit = () => {

        /* TODO: 
          - store project in db
          - save project in current users projectList
        */

        const project = {
            id: generateProjectID(),
            admin: currentUser.sub,
            name: projectVars.project_name,
            description: projectVars.project_description,
            creation_date: new Date().toLocaleDateString(),
            users: [currentUser.sub],
            carbon_reports: [],
            total_carbon: 0
        }

        setNewProject(project);
        setProjectVars({});

        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);

        document.getElementById("new_project_form").reset();
        //console.log("new project created: " + project.name);
    }
    
    // users projects operations
    const projectsList = GetProjects(currentUser);
    // const [selected_project, select_project] = useState({});
    // const [pending_invites, any_pending_invites] = useState(false);
    //console.log(projectsList);
    
    const handleProjectSelect = (e) => {
        e.preventDefault();
        const projectID = e.target.id;
        console.log(projectID);
        
    }
    

    return (
        <div className = "container">

            <Modal
                title="Create Project"
                visible={visible}
                onOk={handleSubmit}
                okText="Create New Project"
                confirmLoading={ confirmLoading }
                onCancel={ handleCancel }
                centered
            >
                <div>
                    <form id="new_project_form">
                        <label>Project Name</label>
                        <input
                            className = "form_input"
                            type = "text"
                            name = "project_name"
                            onChange = { handleChange }
                        />
                        <label>Project Description</label>
                        <input
                            className = "form_input"
                            type = "text"
                            name = "project_description"
                            onChange = { handleChange }
                        />
                    </form>
                </div>
            </Modal>

            <div className="column">
                <div id="projectListCard">
                    <h3 className="centerContent">Projects</h3>
                    { projectsList.map((item, index) => (
                        <div key = {index}>
                            <a className = "projects-list-item" id = {item.id} onClick = { handleProjectSelect.bind(item) }>{item.name}</a>
                        </div>
                    ))}
                    <button className = "create-project-btn" onClick = { showModal }>Create Project</button>
                </div>

                <div id="carbonReportListCard">
                    <h3 className="centerContent">Carbon Reports</h3>
                </div>
            </div>

            <div className = "column">
                <div className="projectBreakdown">
                    <h3>Project Breakdown</h3>
                </div>
            </div>

            <div className = "column">                
                <div className="projectAnalytics">
                    <h3>Project Summary</h3>
                    <p>{JSON.stringify(currentUser, null, 2)}</p>
                </div>
            </div>
                    

                

            <div className="column">
                <div id="projectAdminCard">
                    <h4 className="projectAdminHead">Project Admin</h4>
                    <img className="adminPicture" src={placeholderImg} alt="Display Picture" />
                    <h3>{}</h3>
                    
                    <button>Invite to Project</button>
                    <button className = "delete-project-btn">Delete Project</button>
                </div>

                <div id="membersList">
                    <div className="teamMember">
                        <img className="teamMemberPicture" src={placeholderImg} alt="Display Picture" />
                        <h5 className="teamMemberLabel">{currentUser.given_name} {currentUser.family_name}</h5>
                        <h5 className="teamMemberLabel">{currentUser.email}</h5>
                    </div>
                </div>
            </div>

        </div>
    );
}

const Projects = () => {

    /* AUTH CURRENT USER
    --------------------------------------------------------------------------------- */
    const { loggedIn } = useContext(UserContext);
    const [currentUser, isLoading] = GetUserData();
    

    /* CREATE NEW PROJECT HANDLERS
    --------------------------------------------------------------------------------- */

    

    return (
        

        <div>

            {
                loggedIn ? (

                    <div className="container">
                        { isLoading && <UserLists { ...currentUser } />}

                        
                        
                    </div>

                ) : (<Redirect to="/home" />)
            }

        </div>
    );
}

export default Projects;