import React, { Component } from 'react';
import { Collapse,Dialog,Button } from 'element-react';
import 'element-theme-default';
//import recipe from './sRecipe.js';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state= {}
    this.state.data = {
      recipes:[{
        name:'Juice mix',
       ingredients:['light','potatos']
     },{
       name:'salat',
       ingredients:['not much ','get it done please']
     }]
    }

    this.state.dialog = {
    form: {
      name: '',
      ingredients: []
    }
  };

  }
  render() {
    let self = this
    let activeName = this.state.data.recipes[0].name || undefined
    let recipes = this.state.data.recipes.map(function(e){
      let ingredients = e.ingredients.map(function(ele){
        return(
          <p key={e.ingredients.indexOf(ele)}>{ele}</p>
        )
      })
      return (
        <Collapse.Item title={e.name} key={e.index} name={e.name}>
        {
         ingredients
        }
        <Button type="primary" onClick={self.edit.bind(this,e.index)} >Edit</Button>
        <Button type="primary" onClick={self.deleteRecipe.bind(this,e.index)} >Delete</Button>
        </Collapse.Item>
      )
    })
    return (
      <div className="App">
       <div className="recipes">
           <Collapse value={activeName}>
              {recipes}
           </Collapse>
           <Button onClick={this.add.bind(this)} >Add</Button>
       </div>
      </div>
    );
  }
  edit(){

  }
  deleteRecipe(){

  }
  add(){

  }
  componentDidMount(){
    let self = this
    if(localStorage.getItem('user')){
      this.state.data = JSON.parse(localStorage.getItem('user'))
    }
    for(let ke in this.state.data.recipes){
      self.state.data.recipes[ke].index = ke
    }

  }
}

export default App;
