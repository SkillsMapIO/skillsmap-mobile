/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import connect from 'react-redux/es/connect/connect';
import { EVALUATION_SCREEN } from '../navigation';

// Styles
import Styles from './styles/HomeScreenStyles';
import { systemColors } from '../themes/Colors';

class HomeScreen extends React.Component {
  onLogoutPress = () => {
    this.props.logout();
  };

  render() {
    const welcomeMessage = 'Welcome';

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={Styles.header}>
          <Text style={Styles.headerWelcomeMessage} numberOfLines={1}>{welcomeMessage}</Text>
        </View>
        <Button
          onPress={() => {
            this.props.navigation.navigate(EVALUATION_SCREEN, { id: '5bae5e61fe7c2400558d0637' });
          }}
          backgroundColor={systemColors.primaryButton}
          style={{ marginVertical: 10 }}
          title="Evaluation screen"
        />
        <Button
          onPress={this.onLogoutPress}
          backgroundColor={systemColors.primaryButton}
          title="Logout"
          style={{ marginVertical: 10 }}
        />
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
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

const mapDispatchToProps = ({ user: { logoutRequest } }) => ({
  logout: () => logoutRequest(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
