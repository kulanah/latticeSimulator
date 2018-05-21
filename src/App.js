import React, { Component } from 'react';
import { Atoms } from './components/Atoms';
import { Crystal } from './components/Crystal';
import { Tabs } from './components/Tabs';

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 0,
      tabs: [<Crystal/>, <Atoms/>, '']
    };

    this.setTab = this.setTab.bind(this);
  }

  setTab(index){
    this.setState({selectedTab: index})
  }

  render() {
    return (
      <div id='reacttest'>
        <Tabs setTab={this.setTab}/>
        {this.state.tabs[this.state.selectedTab]}
      </div>
    );
  }
}

export default App;
