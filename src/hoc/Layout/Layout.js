import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    sideDrawerVisable: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({sideDrawerVisable: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
      return { sideDrawerVisable: !prevState.sideDrawerVisable}
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar toggled={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.sideDrawerVisable} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
