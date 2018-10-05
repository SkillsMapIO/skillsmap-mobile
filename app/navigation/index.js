import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Images from '../themes/Images';
// Screens
import EvaluateSkillScreen from '../containers/EvaluateSkillScreen';
import EvaluationScreen from '../containers/EvaluationScreen';
import HomeScreen from '../containers/HomeScreen';
import LoginScreen from '../containers/LoginScreen';
// Styles
import Colors, { systemColors } from '../themes/Colors';

//
export const HOME_SCREEN = 'HomeScreen';
export const EVALUATE_SKILL_SCREEN = 'EvaluateSkillScreen';
export const EVALUATION_SCREEN = 'EvaluationScreen';
export const LOGIN_SCREEN = 'LoginScreen';
export const LOGGED_OUT = 'LoggedOutScreen';
export const LOGGED_IN = 'LoggedInScreen';

const headerOptions = {
  headerStyle: { backgroundColor: systemColors.navHeader, borderBottomColor: Colors.iron },
  headerTintColor: Colors.astral,
  headerTitleStyle: {
    color: systemColors.text,
  },
};

const logoHeaderTitle = (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
    <Image
      source={Images.logo}
      style={{ width: 110, height: 20 }}
    />
  </View>
);

class RootNavigator extends PureComponent {
  render() {
    const { loggedIn } = this.props;

    const loggedOutStack = createStackNavigator(
      {
        [LOGIN_SCREEN]: {
          screen: LoginScreen,
          navigationOptions: () => ({
            ...headerOptions,
            headerLeft: null,
            headerTitle: logoHeaderTitle,
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
          navigationOptions: () => ({
            ...headerOptions,
            headerLeft: null,
            headerTitle: logoHeaderTitle,
          }),
        },
        [EVALUATION_SCREEN]: {
          screen: EvaluationScreen,
          navigationOptions: () => ({
            ...headerOptions,
            headerBackTitle: null,
            title: 'Evaluation',
          }),
        },
        [EVALUATE_SKILL_SCREEN]: {
          screen: EvaluateSkillScreen,
          navigationOptions: () => ({
            ...headerOptions,
          }),
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
