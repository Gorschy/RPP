import React, {Component} from 'react';

export class Pagination extends Component{
    render(){
        const {postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage } = this.props;
        const pageNumbers = [];

        for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
            pageNumbers.push(i);
        }
        

     return(
         <div  style={{"textAlign":"center"}} >
 <ul className="pagination justify-content-center"  >              {
                  Math.ceil(totalPosts/postsPerPage) == 1 ? null: pageNumbers.map(num => (
                    <li style={{"textAlign":"center !important", "display":"inline","margin":"2px", "padding":"10px", "border":"1px solid grey","borderRadius":"3px","backgroundClip":"border-box"}}  key={num}>
                        <a onClick={() => paginate(num)} href="#" style={{ fontWeight: num === currentPage ? '900' : 'normal',}} className="page-link">{num}</a>
                    </li>
                ))
              }
                                   <br/>

                                   <br/>

               
             </ul>
         </div>
     )   
    }
}  
export default Pagination;