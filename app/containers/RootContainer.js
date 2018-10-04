import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  AppState, NetInfo, StatusBar, View,
} from 'react-native';


import NavigationRouter from '../navigation';

// Styles
import Styles from './styles/RootContainerStyles';

class RootContainer extends Component {
  static propTypes = {
    starting: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    resuming: PropTypes.func.isRequired,
    setIsConnected: PropTypes.func.isRequired,
    userLoggedIn: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading === false && prevState.loading) {
      return { loading: false };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = { appState: AppState.currentState, loading: true };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    this.props.starting();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading === false && prevState.loading) {
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.resuming();
    }

    this.setState({ appState: nextAppState });
  };

  handleConnectivityChange = (isConnected) => {
    this.props.setIsConnected(isConnected);
  };

  render() {
    const { userLoggedIn } = this.props;
    return (
      <View style={Styles.applicationView}>
        <StatusBar barStyle="dark-content" backgroundColor="white" hidden={false} />
        <NavigationRouter loggedIn={userLoggedIn} />
      </View>
    );
  }
}

const mapDispatchToProps = ({ connection: { setIsConnected }, startup: { starting, resuming } }) => ({
  starting, setIsConnected, resuming,
});

const mapStateToProps = ({ startup, user }) => ({
  loading: startup.loading,
  userLoggedIn: !!user.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
