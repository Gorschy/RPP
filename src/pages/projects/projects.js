import "../../style.css";
import "./projects.css";
import CarbonBreakdown from '../carbonBreakdown.js';
import defaultImg from "../../assets/default.png"
import { Modal } from "antd";
import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router"
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { listProjects } from "../../graphql/customQueries"; 
import { getUser, listUsers, getProject } from "../../graphql/queries";
import { createProject, createProjectEditor, deleteProjectReport, deleteProject, deleteProjectEditor, updateUser } from '../../graphql/mutations';

Storage.configure({ track: true, level: "public" });

// initialises current logged in users data
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


// handles projects functionality
async function GetProjects(currentUser) {

    try {

        // gets all projects the user has created
        const user_created_projects = await API.graphql(graphqlOperation(listProjects, { filter: {creatorID: {contains: currentUser.id}}}));
        const created_projects = [...user_created_projects.data.listProjects.items];

        // gets all project id's the user is editor_in
        const temp = [...currentUser.projects_in.items];
        const editor_projects = [];
        
        // gets all projects the user is editor_in and processes
        if(temp.length > 0) {
            
            // requests project object for each projectID
            for(let i = 0; i < temp.length; i++) {
                
                const temp_project = await API.graphql(graphqlOperation(getProject, { id: temp[i].projectID}));
                editor_projects.push(temp_project.data.getProject);
            }
        }

        // creates the users project list from created and editor_in projects
        const projects_list = [...created_projects, ...editor_projects];

        // returns every project the user is a part of to the project_list state
        return projects_list;

    } catch(err) {
        console.log("error: ", err);
    }
}




// main component
const UserLists = (currentUser) => {
    
    // projects state control
    const [projects_list, set_projects_list] = useState([]);    // handles state of projects user is part of
    const [global_report, set_global_report] = useState([]);    // stores all selected project reports
    const [team_members, set_team_members] = useState([]);      // handles state of team members in a selected project
    const [selected_project, select_project] = useState();      // handles state for which project is selected currently
    const [project_vars, set_project_vars] = useState({});      // controls form vars for creating new project
    const [user_reports, set_user_reports] = useState([]);      // stores all selected project reports made by current user 
    const [selected_report, select_report] = useState([]);      // handles state for which report is selected currently
    const [no_projects, is_projects] = useState();              // handles whether a user has any projects
    const [emails, set_emails] = useState();                    // handles email inputs
    const [admin, is_admin] = useState();                       // handles whether a user is an admin of a selected project or not

    const [admin_image, set_admin_image] = useState();
    const [image, set_image] = useState();

    const [forceConceal, setConceal] = useState(true);

    
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // modal state control
    const [visible, setVisible] = useState(false);
    const [inviteVisible, setInviteVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showInvite = () => {
        setInviteVisible(true);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setInviteVisible(false);
    };

    // updates email state onchange
    const updateEmails = (e) => {
        const { value } = e.target;
        set_emails(value);
    } 


    // initialises projects functonality on render
    const init = () => {
        
        // gets all projects user is part of and selects first project in list
        const projectsList = GetProjects(currentUser);
        
        // resolves promise returned by above
        projectsList.then(function(result) {
            
            console.log(result);
            
            if(result.length > 0){
                
                is_projects(false);

                set_projects_list(result);

                
                // state issues major bugs.

                // getAdminProfilePicture(result[0].creatorID);
                // getProfilePicture(result[0]);
                // //handleProjectSelect(result[0].id);
                // //select_project(result[0]);
                // if(result[0].creatorID === currentUser.id) is_admin(true);
                // if(result[0].project_carbon_reports.length > 0) set_global_report(generateGlobalReport(result[0].project_carbon_reports.items));
                

            } else { 
                console.log("User has no projects created"); 
                is_projects(true);
            }
        });
    }

    useEffect(() => {
        init();
    }, []);


    // handles grabbing a users profile picture from the s3 bucket
    const getAdminProfilePicture = async (id) => { 

        console.log(id);
        const temp = id + ".png";

        Storage.get(temp)
        .then(url => {
            const request = new Request(url);
            fetch(request).then(function(response) { if(response.status === 200) set_admin_image(url) });
        })
        .catch(err => console.log(err));
    }

    // gets users profile pic url -- state bug - must double click to get correct img
    const getProfilePicture = async (id) => { 

        console.log(id);
        const temp = id + ".png";

        Storage.get(temp)
        .then(url => {
        
            const request = new Request(url);
            fetch(request).then(function(response) { if(response.status === 200) set_image(url); });
            
        })
        .catch(err => console.log(err));
        
        
    }


    // handles generating the global report
    const generateGlobalReport = (reports) => {
    
        const modified_reports = reports.map(({createdAt, date, id, updatedAt, userID, projectID, ...item}) => item);
    
        modified_reports.sum = function(items, prop){
            return items.reduce( function(a, b){
                return (parseFloat(a) + parseFloat(b[prop]));
            }, 0);
        };
    
        const global_report = {
            transportCarbon: modified_reports.sum(modified_reports, "transportCarbon").toString(),
            electricityCarbon: modified_reports.sum(modified_reports, "electricityCarbon").toString(),
            gasCarbon: modified_reports.sum(modified_reports, "gasCarbon").toString(),
            wasteCarbon: modified_reports.sum(modified_reports, "wasteCarbon").toString(),
            waterCarbon: modified_reports.sum(modified_reports, "waterCarbon").toString(),
            paperCarbon: modified_reports.sum(modified_reports, "paperCarbon").toString(),
            foodDrinkCarbon: modified_reports.sum(modified_reports, "foodDrinkCarbon").toString(),
            eventsCarbon: modified_reports.sum(modified_reports, "eventsCarbon").toString(),
            totalCarbon: modified_reports.sum(modified_reports, "totalCarbon").toString()
        }

        return global_report;
    }


    // handles deleting the selected project from the system
    const deleteSelectedProject = async () => {
        
        console.log("Deleting Project -> " + selected_project.id);
        
        try {
            
            const reports_to_delete = selected_project.project_carbon_reports.items;
            const editors_to_delete = selected_project.editors.items;
            const project_to_delete = selected_project.id;
            
            for(let i = 0; i < reports_to_delete.length; i++) {
                await API.graphql(graphqlOperation(deleteProjectReport, { input: { id: reports_to_delete[i].id }})); 
            }
            
            for(let i = 0; i < editors_to_delete.length; i++) {
                await API.graphql(graphqlOperation(deleteProjectEditor, { input: { id: editors_to_delete[i].id }})); 
            }
            
            await API.graphql(graphqlOperation(deleteProject, { input: { id: project_to_delete }}));
            
            init();

        } catch(err) { console.log("Project could not be deleted -> " + err) }
    }


    // handles deleting the selected report from a project
    const deleteSelectedReport = async () => {
        
        

        try {
            console.log("Deleting Report -> " + selected_report.id);
            const report_to_delete = selected_report.id;
            await API.graphql(graphqlOperation(deleteProjectReport, { input: { id: report_to_delete }}));
            
            init();

        } catch(err) { console.log("Report could not be deleted -> " + err) }
    }


    // handles state of selected project from list
    const handleProjectSelect = async (e) => {
        try {
            setConceal(false);
            e.preventDefault();
            const projectID = e.target.id;
            
            // if(typeof e === "string" || e instanceof String) {
            //     projectID = e
            // } else {
            //     
            // }

            console.log(projectID);
            
            const temp = projects_list.filter(obj => { if(obj.id === projectID) return obj });
            const [project] = [...temp];
            //console.log(project);
            const team_member_IDs = project.editors.items;
            const team_members = [];
                        
            for(let i = 0; i < team_member_IDs.length; i++) {
                const temp = await API.graphql(graphqlOperation(getUser, { id: team_member_IDs[i].editorID }));
                const team_member = temp.data.getUser;
                 
                getProfilePicture(team_member.id);
                forceUpdate();
                console.log(image);
                team_member["url"] = image;
                //console.log(image);
                
                console.log(team_member);
                team_members.push(team_member);
            }

            //console.log(team_members);

            const project_reports = [...project.project_carbon_reports.items];
            const user_project_reports = project_reports.filter(obj => { if(obj.userID === currentUser.id) return obj });
            
            if(project.creatorID === currentUser.id) {
                is_admin(true);
            } else { is_admin(false); }

            // sets state for project details
            getAdminProfilePicture(project.creatorID);
            //getProfilePicture(project);
            set_global_report(generateGlobalReport(project_reports));
            set_user_reports(user_project_reports);
            select_report(user_project_reports[0]);
            select_project(project);
            set_team_members(team_members);
        } catch (err) {
            console.log(err);
        }
    }


    // handles total carbon update
    const payOffset = async () => {
        try {
            const total = parseInt(global_report.totalCarbon);
            console.log("paying offset: " + total);
            await API.graphql(graphqlOperation(updateUser, { input: { id: currentUser.id, carbon_units: currentUser.carbon_units + Math.round(total) }}));
            history.push("/solutions");
        } catch(err) {
            console.log(err);
        }
    }


    // handles report selection from project
    const handleReportSelect = (e) => {

        e.preventDefault();
        const report = user_reports.filter(obj => { if(obj.id === e.target.id) return obj });
        select_report(...report);
    }


    // handles form values for new projects
    const handleChange = (e) => {
        
        e.preventDefault();
        const { name, value } = e.target;
        
        set_project_vars(prevState => (
            { ...prevState, [name]: value }
        ));
    }


    // handles creating a new user project
    async function handleSubmit() {  
        set_image([]);
        is_projects(false);
        console.log(project_vars);
        
        const newProject = {
            creatorID: currentUser.id,
            title: project_vars.project_name,
            description: project_vars.project_description
        }

        await API.graphql(graphqlOperation(createProject, { input: newProject}));

        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            init();
        }, 2000);
    }


    // handles invite system for inviting users to a created project
    async function inviteUsers() {
 
        if(emails === undefined) { return }
        // invalid argument containers
        const invalid_emails = [];
        const invalid_accounts = [];
       
        // RFC 2822 standard email validation regex - regex input handling (removes all whitespace and splits via ',')
        var validation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const temp = emails.replace(/ /g,'');
        const test = temp.split(",");

        // invites all valid emails to the project
        for(let i = 0; i < test.length; i++) {
            
            // validates each email string to ensure they are correct
            if(test[i].match(validation)) {

                // check if this email has an account
                const temp = await API.graphql(graphqlOperation(listUsers, { filter: {email: {contains: test[i]}}}));
                const user = temp.data.listUsers.items;

                // if the user has an account
                if(user.length != 0 && test[i] == user[0].email) {
                    
                    // if the user isn't the project admin
                    if(currentUser.id != user[0].id ) {
                        
                        // add user to the selected project
                        console.log(selected_project.id);
                        alert("User Invited!");
                        await API.graphql(graphqlOperation(createProjectEditor, {input: {editorID: user[0].id, projectID: selected_project.id }}));

                        setConfirmLoading(true);
                        setTimeout(() => {
                            setInviteVisible(false);
                            setConfirmLoading(false);
                            init();
                        }, 2000);

                    } else { invalid_accounts.push(test[i]); }
                } else { invalid_accounts.push(test[i]); }
            } else { invalid_emails.push(test[i]); }
        }

        if(invalid_emails.length > 0 || invalid_accounts > 0) {
            console.log("these emails are invalid: \n" + JSON.stringify(invalid_emails, null, 2) + "\nthese emails dont have an account: \n" + JSON.stringify(invalid_accounts, null, 2));
            alert("Sorry it looks like some of the\nusers you tried to invite don't\nhave an account or their email\nwas incorrect. Please try again! ");
        } 
    }

    // redirect handling
    const history = useHistory();

    const createReport = () => {
        let path = "/calculator";
        history.push(path);
    }


    const declineProject = () => {
        let path = "/home";
        history.push(path);
    }
    
    const getImage = (id) => {
       const user_url = image.filter(obj => { if(obj.id === id) return obj.url });
        console.log(user_url.url);
       return user_url;

    }


    return (
        
        <div className = "container">

            {
                no_projects ? (

                    <div>
                        <Modal
                            visible = { no_projects }
                            onOk = { handleSubmit }
                            okText = "Create Project"
                            cancelText = "No Thanks"
                            confirmLoading = { confirmLoading }
                            onCancel = { declineProject }
                            closable = { false }
                            className = "custom-modal"
                            centered
                        >
                            <div className = "center-text">
                                <h1>Looks like you don't have any Projects...</h1>
                                <h2>Would you like to create one?</h2>
                                <h3>We just need a few details...</h3>
                            </div>
                            <form className = "new-project-form">
                                <label className = "form-label">Project Name</label>
                                <input
                                    className = "form-input"
                                    type = "text"
                                    name = "project_name"
                                    onChange = { handleChange }
                                />
                                <label>Project Description</label>
                                <textarea
                                    className = "form-input"
                                    type = "text"
                                    name = "project_description"
                                    onChange = { handleChange }
                                />
                            </form>
                        </Modal>
                    </div>

                ) : no_projects === false ? (
                    
                    <div>
                    
                        {
                            forceConceal ? (

                                <div>  
                                    <Modal
                                        visible = { visible }
                                        onOk = { handleSubmit }
                                        okText = "Create Project"
                                        confirmLoading = { confirmLoading }
                                        onCancel = { handleCancel }
                                        closable = { false }
                                        className = "custom-modal"
                                        centered
                                    >
                                        <div className = "center-text">
                                            
                                        </div>
                                        <form className = "new-project-form">
                                            <h2>Create a new Project!</h2>
                                            <h3>We just need a few details...</h3>
                                            <label className = "form-label">Project Name</label>
                                            <input
                                                className = "form-input"
                                                type = "text"
                                                name = "project_name"
                                                onChange = { handleChange }
                                            />
                                            <label>Project Description</label>
                                            <textarea
                                                className = "form-input"
                                                type = "text"
                                                name = "project_description"
                                                onChange = { handleChange }
                                            />
                                        </form>
                                    </Modal>

                                    <Modal
                                        visible = { inviteVisible }
                                        onOk = { inviteUsers }
                                        okText = "Invite User"
                                        confirmLoading = { confirmLoading }
                                        onCancel = { handleCancel }
                                        closable = { false }
                                        className = "custom-modal"
                                        centered
                                    >
                                        <div className = "center-text">
                                            <h1>Invite a Team Member!</h1>
                                            <h3 className>Just enter their account email...</h3>
                                            <input
                                                className = "form-input"
                                                type = "text"
                                                name = "email"
                                                placeholder = "Team Member Email"
                                                onChange = { updateEmails }
                                            />
                                            <label>Tip: You can add multiple users at once<br/> by seperating their emails by a comma!</label>
                                        </div>
                                        
                                        
                                    </Modal>
                                    <div className = "row">
                                        <div className = "column">
                                            
                                            <div className = "projects-list-card card">
                                                <h2>Projects</h2>
                                                <div className = "lists">
                                                    <ul>
                                                        { projects_list.map((item, index) => (
                                                            <li className = "lists-item" id = { item.id } onClick = { handleProjectSelect.bind(item) } key = { index }>
                                                                <span className = "label" id = { item.id } onClick = { handleProjectSelect.bind(item) }>{ item.title }</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <button className = "create-project-btn" onClick = { showModal }>Create Project</button>
                                            </div>

                                            <div className = "reports-list-card card">
                                                <h2>Carbon Reports</h2>
                                                <div className = "lists">
                                                    <ul>
                                                        { user_reports.map((item, index) => (
                                                            <li className = "lists-item" id = { item.id } onClick = { handleReportSelect.bind(item) } key = { index }>
                                                                <span className = "label" id = { item.id } onClick = { handleReportSelect.bind(item) }>{ item.date }</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <button onClick = { createReport }>Create Report</button>
                                            </div>

                                        </div>

                                        <div className = "column">
                                            <h1 className = "center">Select a project to get started!</h1>
                                        </div>
                                    </div>
                                </div>

                            ) : forceConceal === false ? (

                                <div>

                                    <Modal
                                        visible = { visible }
                                        onOk = { handleSubmit }
                                        okText = "Create Project"
                                        confirmLoading = { confirmLoading }
                                        onCancel = { handleCancel }
                                        closable = { false }
                                        className = "custom-modal"
                                        centered
                                    >
                                        <div className = "center-text">
                                            <h2>Create a new Project!</h2>
                                            <h3>We just need a few details...</h3>
                                        </div>
                                        <form className = "new-project-form">
                                            <label className = "form-label">Project Name</label>
                                            <input
                                                className = "form-input"
                                                type = "text"
                                                name = "project_name"
                                                onChange = { handleChange }
                                            />
                                            <label>Project Description</label>
                                            <textarea
                                                className = "form-input"
                                                type = "text"
                                                name = "project_description"
                                                onChange = { handleChange }
                                            />
                                        </form>
                                    </Modal>

                                    <Modal
                                        visible = { inviteVisible }
                                        onOk = { inviteUsers }
                                        okText = "Invite User"
                                        confirmLoading = { confirmLoading }
                                        onCancel = { handleCancel }
                                        closable = { false }
                                        className = "custom-modal"
                                        centered
                                    >
                                        <div className = "center-text">
                                            <h1>Invite a Team Member!</h1>
                                            <h3 className>Just enter their account email...</h3>
                                            <input
                                                className = "form-input"
                                                type = "text"
                                                name = "email"
                                                placeholder = "Team Member Email"
                                                onChange = { updateEmails }
                                            />
                                            <label>Tip: You can add multiple users at once<br/> by seperating their emails by a comma!</label>
                                        </div>
                                        
                                        
                                    </Modal>
                                
                                    <div className = "column">
                                        
                                        <div className = "projects-list-card card">
                                            <h2>Projects</h2>
                                            <div className = "lists">
                                                <ul>
                                                    { projects_list.map((item, index) => (
                                                        <li className = "lists-item" id = { item.id } onClick = { handleProjectSelect.bind(item) } key = { index }>
                                                            <span className = "label" id = { item.id } onClick = { handleProjectSelect.bind(item) }>{ item.title }</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button className = "create-project-btn" onClick = { showModal }>Create Project</button>
                                        </div>

                                        <div className = "reports-list-card card">
                                            <h2>Carbon Reports</h2>
                                            <div className = "lists">
                                                <ul>
                                                    { user_reports.map((item, index) => (
                                                        <li className = "lists-item" id = { item.id } onClick = { handleReportSelect.bind(item) } key = { index }>
                                                            <span className = "label" id = { item.id } onClick = { handleReportSelect.bind(item) }>{ item.date }</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button onClick = { createReport }>Create Report</button>
                                        </div>

                                    </div>

                                    <div className = "column">
                                        <div className = "test">   
                                            <CarbonBreakdown { ...selected_report } />
                                        </div>
                                    </div>

                                    <div className = "column">                
                                        <div className = "project-analytics-card card">
                                            <h2>{ selected_project && selected_project.title } Summary</h2>
                                            <h3>About</h3>
                                            <p>{ selected_project && selected_project.description }</p>
                                            <h3>Total Carbon</h3>
                                            <h1>{ global_report && parseInt(global_report.totalCarbon).toString() }t CO<sub>2</sub></h1>
                                            {
                                                admin ? (
                                                    
                                                    <div>
                                                        <br/><h2>Admin Panel</h2>
                                                        <div className = "row">
                                                            <button onClick = { payOffset }>Offset Carbon</button>
                                                            <button onClick = { showInvite }>Invite Users</button>
                                                        </div>                       
                                                        <button className = "delete-btn" onClick = { deleteSelectedProject }>Delete Project</button>
                                                        <button className = "delete-btn" onClick = { deleteSelectedReport }>Delete Report</button>
                                                    </div>

                                                ) : null
                                            }
                                            {/* <h3>Analytics</h3> */}
                                            {/*  core ui graphs don't work.  */}
                                            {/* <div>
                                                <canvas id="pieChart" className = "chart" role="img"></canvas>
                                                <canvas id="barChart" className = "chart" role="img"></canvas>
                                                <canvas id="lineChart" className = "chart" role="img"></canvas>
                                            </div> */}
                                            {/* <Graphs { ...selected_report } /> */}
                                        </div>
                                    </div>

                                    <div className = "column">
                                        
                                        <div className = "project-admin-card card">
                                            <h4 className = "project-admin-header">Project Admin</h4>
                                            <img className = "admin-pic" src = { admin_image || defaultImg  } alt = "Display Picture" />
                                            <h3>{ selected_project && selected_project.creator.given_name} { selected_project && selected_project.creator.family_name}</h3>
                                            <h4>{ selected_project && selected_project.creator.email }</h4><br/>
                                            
                                        </div>
                                        <div className = "members-list-card card">
                                            <h2>Team Members</h2>
                                            <div className = "member-container">         
                                                { team_members.map((item, index) => (
                                                    <div className = "team-member-item" key = {index}>
                                                        <div className = "row">
                                                            
                                                            <img className = "team-member-pic" src = { item.url || defaultImg } alt = "" />
                                                            
                                                            <div className = "team-text">
                                                                <span>{ item.given_name } { item.family_name }</span><br/>
                                                                <span>{ item.email }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>        
                                </div>            
                            ) : null
                        }

                    </div>

                ) : null
            }
            
        </div>
    );
}


// parent auth component
const Projects = () => {

    const { loggedIn } = useContext(UserContext);
    const [currentUser, isLoading] = GetUserData();

    return (
        <div>

            {
                loggedIn ? (

                    <div className = "container">
                        { isLoading && <UserLists { ...currentUser } />}
                    </div>

                ) : null
            }

        </div>
    );
}

export default Projects;