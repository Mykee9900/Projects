import React from "react";
import "../components/list.css";

class List extends React.Component{
    constructor(props){
        super(props)
        this.removeItem = this.removeItem.bind(this);
    }

    //starts remove chore function that was passed by props from main component
    removeItem(id){
        this.props.removeChore(id)
    }
    render(){
        return(
            <div className="listBody">
                <h1 className="listHead">Chores</h1>
                    <ul>
                        {this.props.items.map((item, index) =>
                            <li key={index}>{item}<button className="listButton" type="button" onClick={() => this.removeItem(item)}>Delete</button></li>)}
                    </ul>
            </div>
        )
    }
}

export default List
