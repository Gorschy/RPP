import React, {Component} from 'react';

export class Pagination extends Component{
    render(){
        const {postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage } = this.props;
        const pageNumbers = [];

        for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
            pageNumbers.push(i);
        }
        

     return(
         <div>
             <ul className="pagination justify-content-center">
              {
                  Math.ceil(totalPosts/postsPerPage) == 1 ? null: pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                        <a onClick={() => paginate(num)} href="#" style={{ backgroundColor: num === currentPage ? 'powderblue' : 'white',}} className="page-link">{num}</a>
                    </li>
                ))
              }
               

               
             </ul>
         </div>
     )   
    }
}  
export default Pagination;