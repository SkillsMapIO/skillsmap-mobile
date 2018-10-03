import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Screens
import HomeScreen from '../containers/HomeScreen';
import LoginScreen from '../containers/LoginScreen';

// Styles
import Colors, { systemColors } from '../themes/Colors';

//
export const HOME_SCREEN = 'HomeScreen';
export const LOGIN_SCREEN = 'LoginScreen';
export const LOGGED_OUT = 'LoggedOutScreen';
export const LOGGED_IN = 'LoggedInScreen';

const headerOptions = {
  title: 'SkillsMap',
  headerLeft: null,
  headerStyle: { backgroundColor: Colors.appBlue, borderBottomColor: systemColors.k87 },
  headerTintColor: 'red',
  headerTitleStyle: {
    color: Colors.k04,
  },
};

class RootNavigator extends PureComponent {
  render() {
    const { loggedIn } = this.props;

    const loggedOutStack = createStackNavigator(
      {
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
          navigationOptions: () => ({
            ...headerOptions,
          }),
        },
      },
      {
        initialRouteName: LOGIN_SCREEN,
        navigationOptions: () => ({ ...headerOptions }),
      },
    );

    const homeStack = createStackNavigator(
      {
        [HOME_SCREEN]: {
          screen: HomeScreen,
          navigationOptions: () => ({ ...headerOptions }),
        },
      },
      {
        initialRouteName: HOME_SCREEN,
        navigationOptions: () => ({ ...headerOptions }),
      },
    );

    const Navigator = createSwitchNavigator(
      {
        [LOGGED_OUT]: {
          screen: loggedOutStack,
        },
        [LOGGED_IN]: {
          screen: homeStack,
        },
      },
      {
        initialRouteName: loggedIn ? LOGGED_IN : LOGGED_OUT,
      },
    );

    return <Navigator />;
  }
}

RootNavigator.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default RootNavigator;
