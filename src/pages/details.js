import React, { useEffect, useState, useContext, Component } from 'react';
import { Auth } from 'aws-amplify';
import "./admin.css";
import { Redirect } from 'react-router';
import {Accordion,Badge,Breadcrumb, Card, Row, Col, Table, Button, Form, Modal} from 'react-bootstrap';
import { render } from 'react-dom';
import defProfile from '../assets/default_profile.jpg';
import {FontAwesomeIcon }from "@fortawesome/react-fontawesome";
import { faClipboard, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import {faEnvira} from '@fortawesome/free-brands-svg-icons' ;
import { API, graphqlOperation } from 'aws-amplify'; // Used for sending DynamoDB
import {deleteUser} from '../graphql/mutations'; // For removing User

const clipboardIcon = <FontAwesomeIcon  icon={faClipboard} />;
const projectIcon = <FontAwesomeIcon  icon={faUserFriends} />;
const solutionsIcon = <FontAwesomeIcon  icon={faEnvira} />;



function Details(){ 
    const user =JSON.parse(localStorage.getItem('user_key'));
        const [show, setShow] = useState(false);
        const [validated, setValid] = useState(true);
        const [isDeleted, setIsDeleted] = useState(false);
        const email = user.email;
        const handleClose = () => {
            setShow(false);
            setValid(true);
        }
        const handleShow = () => setShow(true);
        const remove = async () => {
            // Exclude the id that has been given from being displayed
            if(document.getElementById("deleteInput").value.toLowerCase() == "delete user" ){
                console.log("worked");
    
            
                document.getElementById("deleteInput").value = "" // Clear Modal
                
                // Shut Modal off
                handleClose();
                console.log(user.id);
                // Delete item
                await API.graphql(graphqlOperation(deleteUser,{input: {id: user.id}} )); // Execute Delete
               
                // boolean isDeleted = true
               setIsDeleted (true);
               localStorage.removeItem('user_key');

          
               }else{
                // Warning Message
                setValid(false);
            }
        }
    return(
    <>
<Card body> 
<Breadcrumb>
    <Breadcrumb.Item href="/admin">Administrator Access</Breadcrumb.Item>
    <Breadcrumb.Item active>{email}</Breadcrumb.Item>
    </Breadcrumb>
{isDeleted == true ? <div>User has been deleted</div> :
<> 
    <div className="hold-center fluid ">
	    <div className="row">
            <Card body>
                <Row>
                    <Col sm={2}>    
                        <h2>User Profile</h2>
                        <img width="100"src={defProfile} className="c-avatar-img" alt="Profile Pic" />
                    </Col>
                    <Col sm={5}>
                        <row>
                            <br/>
                            <h5>Personal Details:</h5>
                            <Table>
                                <tr>
                                    <td>Email:</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>First Name:</td>
                                    <td>{user.given_name}</td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>{user.family_name}</td>
                                </tr>
                                <tr>
                                    <td>Phone:</td>
                                    <td>{user.phone_number}</td>
                                </tr>
                                <tr>
                                    <td>Country:</td>
                                    <td></td>
                                </tr>
                            </Table>
                        </row>
                    </Col>

                    <Col>
                        <br/>
                        <h5>Total Carbon Credits:</h5>
                    </Col>
                </Row>
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header><h2>Carbon Reports {clipboardIcon}</h2></Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                <Accordion.Header><h2>Projects {projectIcon}</h2></Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                <Accordion.Header><h2>Payed Offset Solutions{solutionsIcon}</h2></Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Card>
        </div>
    </div>

    <Button variant="danger" className="profile-delete-btn" onClick={handleShow}>Delete User</Button>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title><Badge className="center" bg="warning" text="dark">Delete {user.email}</Badge>{' '}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>You're About to Delete a User!<br/> Type "<strong>Delete User</strong>" to confirm you wish to delete the user</p>
        <Form.Control  className={validated ? "form-control": "form-control is-invalid"} id="deleteInput" size="xs" type="text" placeholder="Delete User" />
        <div className={ validated ? "hidden" : "inline-errormsg"}>  Please enter "Delete User" for confirmation</div>
    </Modal.Body>
        <div className="footer">
            <div className ="modal-close-btn" >
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </div>
            <div className ="modal-delete-btn">
                <Button variant="outline-danger" onClick={remove}>Delete</Button>
            </div>
        </div>
    </Modal>
</>
 }



</Card>
    </>
   
); }

export default Details