import { Card, Row, Image } from 'antd';
import './home.css';
import '../style.css';
import homeBottomImg from '../assets/homeBottomImg.jpg';
import homeSideImage from '../assets/homeImage3.png';


const home = () => {

    return ( 
        <div>
            <Row justify="center">
                <Card className="homeOurTeamCard" title={<h1>FAQ</h1>}>
                <div id="ourTeamText" className="standardText">
                <h2>What is the Restoration Projects Platform?</h2>
                The Restoration Projects Platform (RPP) is an online solution used by Lord of the Trees allowing individuals and companies to calculate their carbon emissions and provide a range of offset solutions for the user to choose.
                <br />
                <h2>How does the Calculator work?</h2>
                The metrics for the calculations are based on industry standard information that are readily available through annual reports released by the Government. To increase readability, the RPP separates the calculations into clear sections, such as electricity or transport. This allows its users to easily see the areas in which they emit the most with the RPP providing offsetting tips through the Carbon Breakdown.
                <br />
                <h2>How to offset your emissions?</h2>
                Beyond the offsetting tips the RPP provides greater options to offset your emissions through Lord of the Trees. Lord of the Trees has reforestation and sustainability efforts across the globe that the RPP displays on an interactive world map that can be filtered based on your own preferences such as a specific offsetting type like reforestation or for projects in a specific region. Your donations can be made without the need for an account and will be based on your carbon emissions and the RPP allows you to offset your entire report or a specific category.
                <br />
                <h2>Benefits of making an account?</h2>
                While an account is not needed to perform a calculation, making an account will allow you to store your carbon reports and assess your carbon emissions over time evaluating your progress through the RPP. Having an account also allows you to have access to create and join a Project.
                <br />
                <h2>What makes the RPP unique?</h2>
                While there are other carbon calculating sites, what allows the RPP to stand out is the inclusion of Projects. Projects allows account holders to join other users and total the carbon emissions of the group in one report, this is beneficial in calculating the emissions of a single household, a group of friends, or a sector of a company.
                <br />
                For individuals, Projects allow for a group to work together in the journey to help create a more sustainable environment and become carbon neutral, and with the total report it helps make a greater donation to the environmental causes being performed.
                <br />
                For companies, Projects provide insight into the total emissions of the different sectors to allow businesses to assess where the majority of the emissions are, allowing them to focus on these areas when reducing their emission levels.
                <br />  
                </div>
                </Card>    
                <div id="imgWrapper"><Image id = "homeImage" src={homeSideImage} alt="asset" preview={false}/></div> 
            
            <div id="bottomImgWrapper"><Image id = "homeBottomImage" src={homeBottomImg} alt="asset" preview={false}/></div>
            </Row>
        </div>
    );
}
export default home;



