import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse,Button  } from 'element-react';
import 'element-theme-default';
import Recipe from './sRecipe.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state= {}

    this.state.data = {
      recipes:[{
        name:"Juice mix",
       ingredients:["light","potatos"]
     },{
       name:"salat",
       ingredients:["not much","get it done please"]
     }]
    }
this.state.renderC = false
    this.state.dialog = {
    form: {
      name: '',
      ingredients: []
    },
   title:'',
   visible: false
 };
 this.state.actRecipe = 0
 this.state.newAdd = false

  }
  render() {
    var self = this
    let activeName = this.state.data.recipes[0].name || undefined
    this.state.recipes = this.state.data.recipes.map(function(e,index){
      var ke = e.index
      let ingredients = e.ingredients.map(function(ele,inder){
        return(
          <p className="ingres" key={inder}>{ele}</p>
        )
      })
      return (
        <Collapse.Item title={e.name} key={index} name={e.name}>
        {
         ingredients
        }
        <Button type="primary" onClick={()=>{
          self.edit(index)
        }} >Edit</Button>
        <Button type="primary" onClick={()=>{self.deleteRecipe(index)}} >Delete</Button>
        </Collapse.Item>
      )
    })

    return (
      <div  id='app' className="App">
       <div className="recipes">
           <Collapse value={activeName}>
              {this.state.recipes}
           </Collapse>

       </div>
    <div className="preview">

          { this.state.renderC ?
            <div className="compn">
         <Recipe form={this.state.dialog.form} savCh={this.saveC.bind(this)} close={this.closeform.bind(this)} onChange={()=>{
           console.log('hellio')

         }}  />
         <Button type="primary" className="editButton" onClick={this.addIngre.bind(this)} >add ingredient</Button>

         </div>  : null
   }
      </div>

   <Button onClick={this.add.bind(this)} className="read" >Add Recipe</Button>
      </div>
    );
  }
  saveC(){
    console.log(this.state.dialog.form,'helllooodas')
    this.state.data.recipes[this.state.dialog.form.index] = JSON.parse(JSON.stringify(this.state.dialog.form))
    this.forceUpdate()
    localStorage.setItem('user',JSON.stringify(this.state.data))
  }
  addIngre(){

    this.state.dialog.form.ingredients.push('')
    console.log(this.state.dialog.form)
    this.forceUpdate()
  }
  edit(index){
let self = this

//this.state.arc = <p>go</p>
console.log('jhello', this.state.data,this.state.actRecipe,index)
this.state.dialog.form = JSON.parse(JSON.stringify(this.state.data.recipes[index]))
this.setState({renderC : true})
//this.state.nameV =  this.state.data.recipes[this.state.actRecipe].name
console.log(this.state.dialog.form)
console.log(this.refs)
  }
  closeform(){
    this.state.renderC =false
    this.forceUpdate()
  }
  deleteRecipe(index){
    this.state.data.recipes.splice(index,1)
    this.forceUpdate()
    localStorage.setItem('user',JSON.stringify(this.state.data))
  }
  add(){
  this.state.data.recipes.push({
    name:'',
    ingredients:[],
    index:this.state.data.recipes.length-1
  })
  this.forceUpdate()
  }

  componentDidMount(){
    let self = this
if(localStorage.getItem('user')){
    if(JSON.parse(localStorage.getItem('user')).recipes.length){
      console.log(localStorage.getItem('user'),'hey youoooo user here')
      this.state.data = JSON.parse(localStorage.getItem('user'))
      this.forceUpdate()
    }
  }
    console.log('get it done')
    for(let ke in this.state.data.recipes){
      self.state.data.recipes[ke].index = ke
    }

  }
}

export default App;
