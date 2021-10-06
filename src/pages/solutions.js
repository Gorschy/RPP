import React, { useMemo, useState, useContext } from 'react';
import { List, Row, Col, Modal, Button, Divider, Progress, Tooltip, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Auth } from 'aws-amplify';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import '../style.css';
import './solutions.css';
import 'leaflet/dist/leaflet.css';
import treeIcon from '../assets/treeIcon50x50.png';

/* ========================================
COMMENTS BY: Zachary O'Reilly-Fullerton
======================================== */



// Variable initialization.
// This, as you may imagine is the beginning level of zoom for the map. The higher the number, the higher the zoom. Personally,
// I think that a standard zoom of 2 is excellent, however as the map element size shrinks, we may increase the zoom level.
const startingZoom = 2; 
// The starting location of the map, whilst this is so zoomed out, it has no real point, however we may change this later.
const startVariables = [
    0, //Start Latitude
    0, //Start Longitude
];




// This is the details for the custom icon that we have used, the image of the tree... which was screenshotted from an email
// with Aymeric himself, how fancy. The anchor values are where the popup ties to. Please for the love of all that is nice
// in the world DO NOT CHANGE THIS UNLESS YOU KNOW WHAT YOU ARE DOING!
const waypointIcon = L.icon({ 
    iconUrl: treeIcon,
    iconSize: [50,50],
    iconAnchor: [25.5, 50],
    popupAnchor: [0, -50]
})


// This is the standard list of waypoints to add to the map. This array is added to by the call to the database.
// For the moment it is filled with placeholder data for proof of concept.
var waypointList = []
    // waypointList objects follow the nomenclature of [name, description, position (consisting of lat and longitude)].
    var populateArray = [

    /*
    Zac’s Summary

    Title: "Bat And Agave Conservation Project"
    Description: "Assist and enhance agave and bat populations."
    Coordinates: [32.248000, -112.916100]

    Title: "Blue Heart Mangrove Restoration"
    Description: "Preservation and restoration of red mangrove sites in the ‘Blue Heart’ zone and potentially coastal area within the Sunshine Coast Council Group constituency."
    Coordinates: [-26.5175, 153.0341]

    Title: "Borneo Orangutan Project"
    Description: "Assist and protect orangutans and their forest homes."
    Coordinates: [0.1378, 117.4970]

    Title: "CCC Athens Recovery"
    Description: "Reestablishment of landscape after wildfire."
    Coordinates: [37.9464, 23.8167]

    Title: "Daintree Rainforest Conservation"
    Description: "Restore previously farmed land to its original rainforest condition. The Daintree Rainforest is the oldest rainforest on Earth around 180 million years old – older than the Amazon Rainforest and one of the best biologically diverse rainforests in the world."
    Coordinates: [-16.26188066268747, 145.4441841548669]

*/
    {
        "Name"        : "Bat And Agave Conservation Project",
        "Description" : "Assist and enhance agave and bat populations.",
        "Position"    : [32.248000, -112.916100],
        "MaxPurchases": 100,
        "CurrentPurchases"  : 56
    }, 
    {
        "Name"        : "Blue Heart Mangrove Restoration",
        "Description" : "Preservation and restoration of red mangrove sites in the ‘Blue Heart’ zone and potentially coastal area within the Sunshine Coast Council Group constituency.",
        "Position"    : [-26.5175, 153.0341],
        "MaxPurchases": 100,
        "CurrentPurchases"  : 86
    },
    {
        "Name"        : "Borneo Orangutan Project",
        "Description" : "Assist and protect orangutans and their forest homes.",
        "Position"    : [0.1378, 117.4970],
        "MaxPurchases": 100,
        "CurrentPurchases"  : 15
    },
    {
        "Name"        : "CCC Athens Recovery",
        "Description" : "Reestablishment of landscape after wildfire.",
        "Position"    : [37.9464, 23.8167],
        "MaxPurchases": 100,
        "CurrentPurchases"  : 12
    },
    {
        "Name"        : "Daintree Rainforest Conservation",
        "Description" : "Restore previously farmed land to its original rainforest condition. The Daintree Rainforest is the oldest rainforest on Earth around 180 million years old – older than the Amazon Rainforest and one of the best biologically diverse rainforests in the world.",
        "Position"    : [-16.26188066268747, 145.4441841548669],
        "MaxPurchases": 100,
        "CurrentPurchases"  : 5
    }
];

// This is the function that takes an inputted array, theoretically from a database and incrementally pushes it onto the
// above array of waypoints. Pretty simple stuff.
function populateMarkers(solutionsArray) {
    // solutionsArray theoretically = [name, description, position]
    solutionsArray.forEach(solutionItem => {
        waypointList.push(
        {
            "Name"        : solutionItem.Name,
            "Description" : solutionItem.Description, 
            "Position"    : solutionItem.Position,
            "MaxPurchases": solutionItem.MaxPurchases,
            "CurrentPurchases"  : solutionItem.CurrentPurchases
        }
    ) 
    });
};


// Here is where the butter meets the bread and we get moving.
// A map is memoized and is displayed with the variable element of "Waypoints".
// The variable element is created below.
function CreateMap() {

    // Creates the content to be returned.
    const DisplayMap = useMemo( () => (
        <MapContainer 
            id="map" 
            center={startVariables} 
            zoom={startingZoom} 
            scrollWheelZoom={true}
            maxBounds={[[-90, -180],[90, 180]]}
        >
        <TileLayer  
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom='2'
            noWrap="true"
        />
        <Waypoints />
        </MapContainer>
    ), [],)
    
    return (
        <div>
        {DisplayMap}
        </div>
    )
}

// This function takes the waypoint list and maps it to the marker tags. It may not look like much
// but this is the resultant code of 8 hours of research and struggle.
function Waypoints () {
    return (
        waypointList.map((waypoint) => (
            <React.Fragment key={waypoint.Name}>
            <Marker position={(waypoint.Position)} icon={waypointIcon}>
                <Popup>
                    <div>   
                    <div className="markerHeader"><b>{waypoint.Name}</b></div> 
                        <br/>
                    <div className="markerDescription">{waypoint.Description}</div>
                    </div>
                </Popup>
            </Marker>
            </React.Fragment>
        ))
    );
}

// Function call to the populateMarkers function with a bit of test code for proof of concept.

populateMarkers(populateArray);
var itemToPass = {
    "Name"              : "",
    "Description"       : "",
    "Position"          : [0, 0],
    "MaxPurchases"      : 100,
    "CurrentPurchases"  : 0
}

const calcPercent = (CurrentPurchases, MaxPurchases) => { return Math.floor((CurrentPurchases / MaxPurchases)* 100); }
const calcRemainingSpots = (val1, val2) => { return (val1-val2); }
const updateCost = (inputVal) => {document.getElementById("costDiv").innerHTML = 20* inputVal + ".00";}
var firstName;
var carbonScore = 20;
var carbonOffset = 140;
function CreateList () {
    const getUser = async () => {
    
        var user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        firstName = (attributes["given_name"]);
    }
    getUser();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (passedItem) => {
        itemToPass = passedItem;
        setIsModalVisible(true);
    };
    const handleCancel = () => {setIsModalVisible(false);}

    //Capture current authed user
    const {loggedIn} = useContext(UserContext);

    

    return(
        <div>
        
        <List 
        rowKey = {"id"}
        id="solutionList"
        dataSource={waypointList}
        itemLayout={'vertical'}
        header={<div><h1>Solutions</h1><br/><h3>Click a solution to invest.</h3></div>}
        renderItem={item => (
            <List.Item onClick={() => showModal(item)}>
                <List.Item.Meta
                    key = {item.Name}
                    title={<h2>{item.Name}</h2>}
                    description={<div className="standardText">{item.Description}</div>}
                />     
                <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{item.CurrentPurchases} of {item.MaxPurchases} units purchased.</h3>}
                    color={"#ffffff"}>
                    <Progress   className="progressBar" showInfo={false} percent={calcPercent(item.CurrentPurchases, item.MaxPurchases)} 
                                strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} />
                </Tooltip>
                
            </List.Item>
        )}
        ></List>
        

        <Modal className="purchaseModal" title={<h1>Invest in: {itemToPass.Name}</h1>} centred visible={isModalVisible} width="90vw" closable={false}
            footer={[<Button className="cancelButton" onClick={handleCancel}>Back</Button>]} 
        >

            { loggedIn ? ( /* If the user is logged in... */
                <div>
                    <Row justify="space-around">
                    <Col span={12}>
                    <h3><b>{itemToPass.Description}</b></h3>
                    <br/>
                    <Row>
                        <Col span={6}><Progress type="circle" strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} 
                            percent={calcPercent(itemToPass.CurrentPurchases, itemToPass.MaxPurchases)}/></Col>
                        <Col span={18}><h2>
                            {itemToPass.CurrentPurchases} spaces have been filled out of the needed {itemToPass.MaxPurchases}.<br/>
                            {calcRemainingSpots(itemToPass.MaxPurchases, itemToPass.CurrentPurchases)} spaces remain. <br/>
                            Each space represents 1 carbon tonne. <br/>
                            1 carbon tonne = $20 AUD.
                        </h2></Col>
                    </Row>
                    <br/>
                    <Row><Col span={12}>
                        <h3>How many units would you like to purchase? </h3> </Col><Col span={12}>
                        <InputNumber id="purchaseNumberInput" min={1} max={calcRemainingSpots(itemToPass.MaxPurchases, itemToPass.CurrentPurchases)} 
                            defaultValue = {1} onChange={updateCost} step={1}/>
                    </Col></Row>
                    <h3>Total Cost: $<span id="costDiv">20.00</span></h3>





                    </Col>
                    <Divider type="vertical" id="solutionModalVertDivider"/>
                    
                    <Col span={11}>
                    
                    <Row>
                    <Col span={18}>
                        <h2>Hello, <b>{firstName}</b>.<br/>
                        You have <b>{carbonScore}</b> tonnes of excess carbon 
                        emission that hasn't been offset. <br/>
                        You have offset a total of <b>{carbonOffset}</b> tonnes
                        of carbon.<br/></h2>
                    </Col>
                    <Col span={6}>
                        <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{carbonOffset}/{carbonOffset+carbonScore} Carbon Tonnes offset.</h3>}
                            color={"#ffffff"}>
                        <Progress className="progressBar" percent={calcPercent(carbonOffset, (carbonOffset+carbonScore))} 
                            strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} trailColor = {"#8b0000"} type="circle"/>
                        </Tooltip>
                    </Col>
                    </Row>
                        
                    </Col>
                    </Row>
                </div>
            ) : ( /* If they arent logged in... */
                <div id="loginAndRegisterContainer">
                    <h2 id="loginAndRegisterText">Please log in or register to make a purchase.</h2>
                    <Link to="/login"><Button className="loginAndRegisterButtons">Log In</Button></Link>
                    <br/><br/>
                    <Link to="/register"><Button className="loginAndRegisterButtons">Register</Button></Link>
                </div>
            )}
        </Modal>

        </div>
    );

}

// Finally, the actual section that renders the page.
const Solutions = () => { 
    return(
        <div>
            <Row>
            <CreateMap  />
            
            <CreateList />
            </Row>
        </div>
    ); 
}

export default Solutions;


