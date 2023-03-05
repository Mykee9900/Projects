import './App.css';
import React from 'react';
import New from '../components/newTodo';
import List from '../components/list';
import Filter from '../components/filter';

class App extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        newValue: "",
        chores: ["Laundry", "wash car", "Rigo"]};
      this.addChore = this.addChore.bind(this);
      this.onChangeChore = this.onChangeChore.bind(this);
      this.removeChore = this.removeChore.bind(this);
    }

    //creats new chore to be added to chores list
    onChangeChore(newChore){
      this.setState({newValue: newChore});
    }

    //adds the created chore to the list
    addChore(){
      this.setState(state => {
        const chores = this.state.chores.concat(state.newValue);
        return {
          chores, newValue: "",
        };
      })
    }

    //removes a chore from the list
    removeChore(value){
      console.log(value)
      this.setState(state => {
        const chores = state.chores.filter(chores => chores != value);
        console.log(chores)

        return {
          chores,
        };
      });
    };

  render(){
    return(
      <div>
        <h1 className='Header'>Your to do list</h1>
        < New changeChore={this.onChangeChore} addItem={this.addChore} currentValue={this.state.value}/>
        < List items={this.state.chores} removeChore={this.removeChore}/>
        < Filter />
      </div>
    )
  }
}

export default App;
