import React from "react";
import '../components/newTodo.css';

class New extends React.Component{
    constructor(props){
        super(props)
        this.createChore = this.createChore.bind(this);
        this.addChore = this.addChore.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    //passes the value created from the user in input and passes it to the changechore function from props
    createChore(e){
        let text = e.target.value;
        this.props.changeChore(text);
    }
    addChore(){
        this.props.addItem()
    }
    clickHandler(){
        alert("click button")
    }

    render(){
        return(
            <form>
                <input type="text" placeholder="Add new" value={this.props.currentValue} onChange={this.createChore}></input>
                <button type="button" onClick={this.addChore}>Add a chore</button>
            </form>
        )
    }
}

export default New
