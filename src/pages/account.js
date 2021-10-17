import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Form, Input, Button, Divider, Select} from 'antd';
import { UserContext } from './UserContext';
import { Auth } from 'aws-amplify';
import "./account.css";
import "../style.css";
import { Redirect } from 'react-router';


import Amplify, { Analytics, Storage } from "aws-amplify";
Storage.configure({ track: true, level: "protected" });

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


    const [image, setImage] = useState();
    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
      fileInput.current.click();
    };
  
    const onProcessFile = e => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
      reader.onloadend = () => {
        setImage(reader.result);
      };
      //Need to change profilePicture.png into userSub Id
      Storage.put("profilePicture.png", file, {
        contentType: "image/png"
      })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };
    
      const onPageRendered = async () => {
        getProfilePicture();
      };
    
      const getProfilePicture = () => {
        //Need to change profilePicture.png into userSub Id
        Storage.get("profilePicture.png")
          .then(url => {
            var myRequest = new Request(url);
            fetch(myRequest).then(function(response) {
              if (response.status === 200) {
                setImage(url);
              }
            });
          })
          .catch(err => console.log(err));
      };

    const [errors, setErrors] = useState('');

    useEffect(() => {
        displayUserDetails();
        onPageRendered();
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
                                maxLength="30"
                                onChange={e => setGivenName(e.target.value)}
                            />
                        </Form.Item>


                <a href="#">
                    <input
                        type="file"
                        onChange={onProcessFile}
                        ref={fileInput}
                    />
                </a>
                <img src={image} onClick={onOpenFileDialog} />

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
                                maxLength="30"
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
                                maxLength="40"
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
                                maxLength="12"
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
                                maxLength="30"
                                onChange={e => setCurrentPassword(e.target.value)} 
                                /*addonBefore={prefixSelector} style={{ width: '100%' }}*/
                            />
                </Form.Item>

                <Form.Item className="space"
                    label={<h3 className="inputHeaderSpacing">New Password</h3>}
                    name="newPW"
                    rules={[{ required: false, message: 'Please input your new password!' }]}
                >
                    <Input.Password className="inputFieldLong" maxLength="30"/>
                </Form.Item>

                <Form.Item className="space"
                    label={<h3 className="inputHeaderSpacing">Confirm New Password</h3>}
                    name="newPWConfirm"
                    rules={[{ required: false, message: 'Please confirm your new password!' }]}
                >
                    <Input.Password className="inputFieldLong" maxLength="30"/>
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