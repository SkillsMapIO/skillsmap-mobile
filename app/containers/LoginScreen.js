import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import connect from 'react-redux/es/connect/connect';

import { systemColors } from '../themes/Colors';

// Styles
import Styles from './styles/LoginScreenStyles';

class LoginScreen extends React.Component {
  onLoginPress = () => {
    this.props.login();
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Button
          loading={this.props.loggingIn}
          disabled={this.props.loggingIn}
          onPress={this.onLoginPress}
          backgroundColor={systemColors.primaryButton}
          style={Styles.loginButton}
          title={this.props.loggingIn ? ' ' : 'Login'}
          raised
        />
      </SafeAreaView>
    );
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({ user: { loginRequest } }) => ({
  login: (username, password) => loginRequest({ username, password }),
});

const mapStateToProps = (state) => ({
  loginError: state.user.loginError,
  loggingIn: state.user.loggingIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
