class Hello extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "world"
    }
  }
  update(e) {
    this.setState({
      txt: e.target.value
    })
  }
  render() {
    return (
      <div>
      <h1>Hello {this.state.name}</h1>
      <input type='text' onChange={this.update.bind(this)}/>
      </div>
    )
  }
};
