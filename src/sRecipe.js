import React, { Component } from 'react';

class Recipe extends Component{
  constructor(props){
    super(props)
    this.state  ={}
    this.updateUser = this.updateUser.bind(this)
    //this.ingreRemo = this.ingreRemo.bind(this)
  }
  render(){
    let self = this
    this.state.ingres = this.props.form.ingredients.map(function(e,index){
      return(
        <div key={index} className="ingres">
        <input type='text' key={index} placeholder="ingredient"  ref={'ingr'+String(index)} />
        <p className="closex" key={index+10} onClick={()=>{
          self.ingreRemo(index)
        }}>X</p>
        </div>

        )
    })
    return(
      <div className="edform">
        <label >Recipe name</label>
      <input type="text" ref="name" />
      <br/>
    {this.state.ingres}
    <br/>
    <button onClick={this.save.bind(this)}>Save changes</button>
    <br/>
    <button onClick={this.close.bind(this)}>close</button>
    <br/>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.form) !== JSON.stringify(nextProps.form)){
     this.props.form.name = nextProps.form.name
     this.props.form.ingredients = []
     for(let ke in  nextProps.form.ingredients){
       this.props.form.ingredients.push(nextProps.form.ingredients[ke])
     }
     this.props.form.index = nextProps.form.index
     console.log('hello')
     this.updateUser()

    }
    console.log('why the heck')
  }
  close(){
    this.props.close()
  }
  save(){
    this.props.form.name = this.refs.name.value
    this.props.form.ingredients = []
    for(let he in this.refs){
      if(he=='name'){}else{
        console.log(he)
        this.props.form.ingredients.push(this.refs[he].value)
      }
    }
    this.props.savCh()
    this.setState({rForm: this.props.form})
console.log(this.props.form)
  }
  ingreRemo(index){
  if(!Number.isNaN(index)){
    //console.log('hekllafa')
    this.props.form.ingredients.splice(index,1)
    //console.log((this.props.form.ingredients))
    this.updateUser()
  }
}
  updateUser() {
    console.log(this)
this.forceUpdate()
let self = this
this.state.ingArr = []
for(let ke in this.props.form.ingredients){
  this.state.ingArr.push(this.props.form.ingredients[ke])
}
//console.log(this.props.form.ingredients,this.refs)
this.refs.name.value = this.props.form.name

for(let ke = 0;ke< this.props.form.ingredients.length;ke++){
  if(ke !== 1){
  ///console.log(self.refs['ingr'+String(ke)],self.refs,'ingr'+String(ke),self.refs['ingr1'],"ingr1",ke)
  self.refs['ingr'+String(ke)].value = self.state.ingArr[ke]
 }
else{
  //console.log(self.refs['ingr'+String(ke)],'ingr'+String(ke),self.refs['ingr1'],"fhadaoigjjjj",ke)
  //console.log(self.refs,self.refs['ingr1'])
  setTimeout(function(){
  self.refs['ingr1'].value= self.state.ingArr[ke]
},200)
}
}
this.forceUpdate()
}
  componentWillMount(){
    let self = this
    console.log(this.props,'hellllo its gets mounted')

    this.state.ingArr = []
    for(let ke in this.props.form.ingredients){
      this.state.ingArr.push(this.props.form.ingredients[ke])
    }
    console.log(this.state.ingArr)
  }
  componentDidMount(){
    this.updateUser()
    let self = this
    console.log(this.props.form.ingredients)
    this.refs.name.value = this.props.form.name
    for(let ke in this.props.form.ingredients){
      self.refs['ingr'+String(ke)].value = self.state.ingArr[ke]
    }
  // this.setState({go : 0})
  //  this.setState({go : go+1})
this.forceUpdate()
  }

}
export default Recipe;
