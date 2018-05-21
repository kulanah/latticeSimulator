import React from 'react';
import '../windows.css';

class Tab extends React.Component{
  constructor(props){
    super(props);

    console.log(this.props.setTab);
    console.log(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.setTab(this.props.index);
  }

  render(){
    console.log('we rendering a tab');
    let tabid = 'tab' + this.props.index;
    return(
      <div onClick={this.handleClick} id={tabid} key={tabid} className='tabsheader'>{this.props.title}</div>
    );
  }
}

export { Tab };