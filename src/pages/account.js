import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Form, Input, Button, Divider, Select} from 'antd';
import { UserContext } from './UserContext';
import { Auth,API, graphqlOperation  } from 'aws-amplify';
import "./account.css";
import "../style.css";
import { Redirect } from 'react-router';
import {updateUser} from '../graphql/mutations';

const Account = () => { 
    //const { Option } = Select;
    const {loggedIn, setLoggedIn} = useContext(UserContext);

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    const [errors, setErrors] = useState('');

    useEffect(() => {
        displayUserDetails();
    }, []);

    const displayUserDetails = async () => {
        //Capture current authed user
        let user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;

        //Display User Details
        //First Name
        if(attributes.given_name !== undefined ){
            var fNameInput = document.getElementById("firstName");
            if(fNameInput){
                fNameInput.value = attributes.given_name;
            }
            
        }
        //Last Name
        if(attributes.family_name !== undefined ){
            var lNameInput = document.getElementById("lastName");
            if(lNameInput){
                lNameInput.value = attributes.family_name;
            }
        }
        //Email
        if(attributes.email !== undefined ){
            var emailInput = document.getElementById("email");
            if(lNameInput){
                emailInput.value = attributes.email;
            }
        }
        //Phone Number
        if(attributes.phone_number !== undefined ){
            var phoneNumberInput = document.getElementById("phoneNumber");
            if(lNameInput){
                phoneNumberInput.value = attributes.phone_number;
            }
        }
    };

    const updateUserDetails = async () => {
        let user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, {
            'email': email,
            'given_name': givenName,
            'family_name': familyName,
            'phone_number': phoneNumber
        });


        await API.graphql(graphqlOperation(updateUser,{input: {id: user.id, email: email, given_name: givenName, family_name: familyName, phone_number:phoneNumber }} )); // Execute Delete

    };
   
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
    <div> 
    { loggedIn ? (
        <Row justify="space-around" >
        <Card class='CardClass' title={<h1>Account Information</h1>} style={{width:'40%'}}>
                
                <Form
                name="accountForm"
                layout="vertical"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >

                <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item
                            label={<h3 className="inputHeaderSpacing">First Name</h3>} name="fName"
                            rules={[{ required: false, message: 'Please input your first name!' }]}
                        >
                            <input className="inputFieldShort"
                                id="firstName"
                                label="firstName" 
                                value={givenName}
                                onChange={e => setGivenName(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<h3 className="inputHeaderSpacing">Last Name</h3>} name="lName"
                            rules={[{ required: false, message: 'Please input your last name!' }]}
                        >
                            <input className="inputFieldShort" 
                                id='lastName'
                                label="lastName" 
                                value={familyName}
                                onChange={e => setFamilyName(e.target.value)}
                             />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item
                            label={<h3 className="inputHeaderSpacing">Email</h3>} name="email"
                            rules={[{ type: 'email', message: 'The input is not a valid Email!', },
                                { required: false, message: 'Please input your Email!', }, ]}
                        >
                            <input className="inputFieldShort" 
                                id="email"
                                label="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label={<h3 className="inputHeaderSpacing">Phone Number</h3>} name="phoneNumber"
                            rules={[{ required: false, message: 'Please input your phone number!' }]}
                        >
                            <input className="inputFieldShort" 
                                id='phoneNumber'
                                label="phoneNumber" 
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)} 
                                /*addonBefore={prefixSelector} style={{ width: '100%' }}*/
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left"><h2>Change Password</h2></Divider>

                <Form.Item className="space"
                    label={<h3 className="inputHeaderSpacing">Old Password</h3>}
                    name="oldPW"
                    rules={[{ required: false, message: 'Please input your old password!' }]}
                >   
                    <input className="inputFieldLong" 
                                id='currentPassword'
                                label="currentPassword" 
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)} 
                                /*addonBefore={prefixSelector} style={{ width: '100%' }}*/
                            />
                </Form.Item>

                <Form.Item className="space"
                    label={<h3 className="inputHeaderSpacing">New Password</h3>}
                    name="newPW"
                    rules={[{ required: false, message: 'Please input your new password!' }]}
                >
                    <Input.Password className="inputFieldLong"/>
                </Form.Item>

                <Form.Item className="space"
                    label={<h3 className="inputHeaderSpacing">Confirm New Password</h3>}
                    name="newPWConfirm"
                    rules={[{ required: false, message: 'Please confirm your new password!' }]}
                >
                    <Input.Password className="inputFieldLong"/>
                
                </Form.Item>
                <span className="errorLabel">{errors}</span>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" id="pWSubmitButton" onClick={updateUserDetails}>Update Account</Button>
                    </Form.Item>
                </Form>
        </Card></Row>
    ) : (<Redirect to="/home"/>) }
    </div>
); }

export default Account