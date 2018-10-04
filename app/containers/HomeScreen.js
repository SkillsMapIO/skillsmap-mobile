/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import connect from 'react-redux/es/connect/connect';

// Styles
import Styles from './styles/HomeScreenStyles';

class HomeScreen extends React.Component {
  render() {
    const welcomeMessage = 'Welcome';

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={Styles.header}>
          <Text style={Styles.headerWelcomeMessage} numberOfLines={1}>{welcomeMessage}</Text>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
const mapStateToProps = () => ({});

const mapDispatchToProps = ({ user: { logoutRequest } }) => ({
  logout: () => logoutRequest(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
