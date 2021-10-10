import React, { useMemo, useState, useContext, Component } from 'react';
import { List, Row, Col, Modal, Button, Divider, Progress, Tooltip, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {listSolutions} from '../graphql/queries';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet';
import '../style.css';
import './solutions.css';
import 'leaflet/dist/leaflet.css';
import treeIcon from '../assets/treeIcon50x50.png';

/* ========================================
COMMENTS BY: Zachary O'Reilly-Fullerton
======================================== */

const startingZoom = 2; 
var waypointList = [];
var usersName;
const startVariables = [
    0, //Start Latitude
    0, //Start Longitude
];
const waypointIcon = L.icon({ 
    iconUrl: treeIcon,
    iconSize: [50,50],
    iconAnchor: [25.5, 50],
    popupAnchor: [0, -50]
})
var itemToPass = {
    "title"             : "",
    "desc"              : "",
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

function Waypoints () {
    console.log(waypointList);
    return (
        waypointList.map((LOI) => (
            <React.Fragment key={LOI.title}>
            <Marker position={LOI.coords} icon={waypointIcon}>
                <Popup>
                    <div className="markerHeader"><b>{LOI.title}</b></div> 
                    <br/>
                    <div className="markerDescription">{LOI.desc}</div>
                </Popup>
            </Marker>
            </React.Fragment>
        ))
    );
}

function CreateList () {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (passedItem) => {
        itemToPass = passedItem;
        setIsModalVisible(true);
    };
    const handleCancel = () => {setIsModalVisible(false);}

    return(
        <div>
        
        <List 
        rowKey = {"id"}
        id="solutionList"
        dataSource={waypointList}
        itemLayout={'vertical'}
        header={<div><h1>Solutions</h1><br/><h3>Click a solution to invest.</h3></div>}
        renderItem={item => (
            <List.Item className="solListItem" onClick={() => showModal(item)}>
                <List.Item.Meta
                    title={<h2>{item.title}</h2>}
                    description={<div className="standardText">{item.desc}</div>}
                />     
                <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{item.filledP} of {item.totalP} units purchased.</h3>}
                    color={"#ffffff"}>
                    <Progress   className="progressBar" showInfo={false} percent={calcPercent(item.filledP, item.totalP)} 
                                strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} />
                </Tooltip>
                
            </List.Item>
        )}
        ></List>
        

        <Modal className="purchaseModal" title={<h1>Invest in: {itemToPass.title}</h1>} centred visible={isModalVisible} width="90vw" closable={false}
            footer={[<Button className="cancelButton" onClick={handleCancel}>Back</Button>]} 
        >

            { loggedIn ? ( /* If the user is logged in... */
                <div>
                    <Row justify="space-around">
                    <Col span={12}>
                    <h3><b>{itemToPass.desc}</b></h3>
                    <br/>
                    <Row>
                        <Col span={6}><Progress type="circle" strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} 
                            percent={calcPercent(itemToPass.filledP, itemToPass.totalP)}/></Col>
                        <Col span={18}><h2>
                            {itemToPass.filledP} spaces have been filled out of the needed {itemToPass.totalP}.<br/>
                            {calcRemainingSpots(itemToPass.totalP, itemToPass.filledP)} spaces remain. <br/>
                            Each space represents 1 carbon tonne. <br/>
                            1 carbon tonne = $20 AUD.
                        </h2></Col>
                    </Row>
                    <br/>
                    <Row><Col span={12}>
                        <h3>How many units would you like to purchase? </h3> </Col><Col span={12}>
                        <InputNumber id="purchaseNumberInput" min={1} max={calcRemainingSpots(itemToPass.totalP, itemToPass.filledP)} 
                            defaultValue = {1} onChange={updateCost} step={1}/>
                    </Col></Row>
                    <h3>Total Cost: $<span id="costDiv">20.00</span></h3>

                    </Col>
                    <Divider type="vertical" id="solutionModalVertDivider"/>
                    
                    <Col span={11}>
                    
                    <Row>
                    <Col span={18}>
                        <h2>Hello, <b>{usersName}</b>.<br/>
                        You have <b>{carbonScore}</b> tonnes of excess carbon 
                        emission that hasn't been offset. <br/>
                        You have offset a total of <b>{carbonOffset}</b> tonnes
                        of carbon.<br/></h2>
                    </Col>
                    <Col span={6}>
                        <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{carbonOffset}/{carbonOffset+carbonScore} Carbon Tonnes offset.</h3>}
                            color={"#ffffff"}>
                        <Progress className="progressBar" percent={calcPercent(carbonOffset, (carbonOffset+carbonScore))} 
                            strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} type="circle"/>
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

function populateMarkers(solutionsArray) {
    solutionsArray.forEach(solutionItem => {
        waypointList.push(
        {
            "title"         : solutionItem.title,
            "desc"          : solutionItem.desc,
            "coords"        : [parseFloat(solutionItem.coordX), parseFloat(solutionItem.coordY)],
            "filledP"       : parseFloat(solutionItem.filledP),
            "totalP"        : parseFloat(solutionItem.totalP),
            "type"          : solutionItem.type,
            //"funding"       :
            "backerCount"   : solutionItem.backerCount
        }
    ) 
    });
};

// Finally, the actual section that renders the page.
class Solutions extends Component { 
    constructor(props) {
        super(props)
        this.deleteInput = null;
    }

    state = {
        user: null,
        loaded: false
    }

    async componentDidMount () {
        var currentUser = await Auth.currentAuthenticatedUser();
        const { attributes } = currentUser;
        this.setState({user: currentUser})
        usersName = this.state.user.attributes.given_name

        const getSols = await API.graphql(graphqlOperation(listSolutions));
        const returnArray = getSols.data.listSolutions.items;

        populateMarkers(returnArray)
        this.setState({loaded: true})
    }

    
    render() {
        return(
            <div>
                <Row>
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
                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Solution Type 1">
                            <LayerGroup>
                            <Waypoints />
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Solution Type 2">
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Solution Type 3">
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Solution Type 4">
                        </LayersControl.Overlay>
                    </LayersControl>
                    
                    </MapContainer>
                
                <CreateList />
                </Row>
            </div>
        ); 

    }
    
}

export default Solutions;


