import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {backColor: 'green'};
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor() {
    let colors = ["red", "green", "blue", "orange", "purple"];
    let num = Math.floor(Math.random() * 4);
    this.setState({backColor: colors[num]})
  }
  render() {
    return(
      <div style={{background: this.state.backColor}} id="main">
        <h1>The current color is {this.state.backColor}</h1>
        <button onClick={this.changeColor}>Change the color</button>
      </div>
    )
  }
}

export default App;
