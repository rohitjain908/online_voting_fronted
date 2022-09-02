import { Component } from "react";
import Sidebar from "./sidebar";



import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { votesList } from "../../../api";


export const productsGenerator = quantity => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
    }
    return items;
  };
  

class Votes extends Component{

    constructor(props){
        super(props)

        this.state = {
            votesList : ''
        }
    }


    componentDidMount(){
        this.getdata()
      }


    getdata=()=>{
        const obj = {
            adminUniversity : 'IIT BHU'
        }
        votesList(obj).then(res =>{
            //console.log(res)
            let data = res['data']
            if(data['messgae'] == 'success'){
                // console.log("here")
                // console.log(data['votesList'])
                this.setState({
                    votesList : data['votesList']
                })
            }
       })
      }

    
    
    render(){



        const products = productsGenerator(100);
        console.log(products)
        console.log(this.state.votesList)
        const columns = [
            {
                dataField: "voter",
                text: "Voter's Name",
                sort: true,
                filter :textFilter({ caseSensitive: true })
            },
            {
                dataField: "candidate",
                text: "Candidate Voted For",
                sort: true,
                filter : textFilter({ caseSensitive: true })
            },
            {
                dataField: "position",
                text: "Position",
                filter :textFilter({ caseSensitive: true })
            }
        ];
  
        return(
            <>
                <Sidebar/>
                <main style={{marginTop : '56px'}}>
                    <div class="container pt-4">
                        <div style = {{padding: '5px', fontSize: '25px'}}>
                            Votes List
                        </div>
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={this.state.votesList}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                            filter = {filterFactory()}
                            filterPosition="top"
                        />
                    </div>
                </main>
                
            </>
        )
    }
}

export default Votes;