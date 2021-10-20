import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { Menu, Button, Image, Dropdown } from 'antd';
import './Navbar.css';
import '../style.css';
import logo from '../assets/LOTT rd.png';
import { Auth, Storage } from 'aws-amplify';
import Avatar from '../assets/avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Item } = Menu;
const { SubMenu } = Menu;
/* TODO:
    - add light dark mode functionality
    - route page tabs
    - style according to style guide
    - remove hover border
*/
const Navbar = () => {

    //Not sure if this needs to be braces vs brackets???
    const {loggedIn, setLoggedIn} = useContext(UserContext);

    const [image, setImage] = useState(Avatar);

    const getProfilePicture = async () => {
        //Need to change profilePicture.png into userSub Id
        let user = await Auth.currentAuthenticatedUser();
        let temp = user.attributes.sub + ".png";
        Storage.get(temp)
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
 
    const signOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    useEffect(() => {
        getProfilePicture();
    }, []);

    return (
        <div>
            {/* The Hidden Burger Model */}
            <Menu className="burgerList" mode="horizontal" defaultSelectedKeys={["Home"]}>
                <Item key="Home"><Link to='/home'><Image src={logo} id="LOTTLogo" preview={false}/></Link></Item>
                <Menu.Item> <SubMenu key="SubMenu" mode="vertical" title={<h3 className="navbarHeaders">Burger</h3>}>
                {loggedIn ? ( <Item key="Dashboard"> <Link to='/dashboard'><h3 className="navbarHeadersBurger">Dashboard</h3></Link> </Item>) : null }   
                <Item key="Calculator"> <Link to='/calculator'><h3 className="navbarHeadersBurger">Calculator</h3></Link> </Item>
                {loggedIn ? (<Item key="Projects"> <Link to='/projects'><h3 className="navbarHeadersBurger">Projects</h3></Link> </Item>) : null }
                <Item key="Solutions"> <Link to='/solutions'><h3 className="navbarHeadersBurger">Solutions</h3></Link> </Item>
                <Item key="ContactUs"> <Link to='/contactUs'><h3 className="navbarHeadersBurger">Contact Us</h3></Link> </Item>
                </SubMenu> </Menu.Item> 
                
            </Menu>

            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["Home"]} className="leftStyle">
                <Item key="Home"><Link to='/home'><Image src={logo} id="LOTTLogo" preview={false}/></Link></Item>
                {loggedIn ? ( <Item key="Dashboard"> <Link to='/dashboard'><h3 className="navbarHeaders">Dashboard</h3></Link> </Item>) : null }   
                <Item key="Calculator"> <Link to='/calculator'><h3 className="navbarHeaders">Calculator</h3></Link> </Item>
                {loggedIn ? (<Item key="Projects"> <Link to='/projects'><h3 className="navbarHeaders">Projects</h3></Link> </Item>) : null }
                <Item key="Solutions"> <Link to='/solutions'><h3 className="navbarHeaders">Solutions</h3></Link> </Item>
                <Item key="ContactUs"> <Link to='/contactUs'><h3 className="navbarHeaders">Contact Us</h3></Link> </Item>

                {loggedIn ? ( <Item key="profileImage"> <img className = "profile-pic" src={image} /> </Item> ) : null }   

            </Menu>

        <Menu theme="light" mode="horizontal" className="rightStyle">

            { loggedIn ? (
                    <Link to="/">  
                        <Button onClick={signOut} className="loginButtonNav" type="primary">
                            Sign out
                        </Button>
                    </Link> 
                ) : ( 
                    <div>
                        <Link to='/register'>
                            <Button type="link" style={{paddingRight: 30}}><div className="standardTextLink">Need an Account?</div></Button>
                        </Link>
                        <Link to="/login">    
                            <Button  className="loginButtonNav" type="primary">
                                Login
                            </Button>
                        </Link>
                        
                    </div>
                )}
        </Menu>     
        </div>
    );
}

export default Navbar;

