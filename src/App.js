import React, { Component } from 'react';
import { Atoms } from './components/Atoms';
import { Crystal } from './components/Crystal';
import { Tabs } from './components/Tabs';
import { View } from './components/View';

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedTab: 2,
      tabs: [<Crystal/>, <Atoms/>, <View />]
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
