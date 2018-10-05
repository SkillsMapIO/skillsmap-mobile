/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar,
  Text,
  View,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import connect from 'react-redux/es/connect/connect';
import { EVALUATION_SCREEN } from '../navigation';
import EvaluationItem from '../components/EvaluationItem';

// Styles
import Styles from './styles/HomeScreenStyles';
import { systemColors } from '../themes/Colors';

class HomeScreen extends React.Component {
  onLogoutPress = () => {
    this.props.logout();
  };

  renderMyEvaluationsHeader = () => (
    <View style={Styles.listTitleContainer}>
      <View style={Styles.listTitle}>
        <Text style={Styles.listTitleText}>My Evaluations</Text>
      </View>
    </View>
  );

  renderEvaluationItem = ({ item }) => {
    const simplifiedEvaluationData = {
      name: item.template && item.template.name,
      status: item.status,
    };

    return (
      <EvaluationItem
        key={item.id}
        {...simplifiedEvaluationData}
        onPress={() => this.props.navigation.navigate(EVALUATION_SCREEN, { id: item.id })}
      />
    );
  };

  render() {
    const myEvaluations = this.props.evaluationsData;

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={myEvaluations}
          keyExtractor={(item) => item.id}
          renderItem={this.renderEvaluationItem}
          ListHeaderComponent={this.renderMyEvaluationsHeader}
          ItemSeparatorComponent={() => <View style={Styles.evaluationSeparator} />}
          ListEmptyComponent={() => (
            <View style={Styles.evaluationsListEmpty}>
              <Text style={Styles.evaluationsListEmptyText}>No evaluations completed!</Text>
            </View>
          )}
        />
        <Button
          onPress={this.onLogoutPress}
          backgroundColor={systemColors.primaryButton}
          title="Logout"
          style={{ marginBottom: 20 }}
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
const mapStateToProps = ({ evaluations: { evaluationsData } }) => ({
  evaluationsData,
});

const mapDispatchToProps = ({ user: { logoutRequest } }) => ({
  logout: () => logoutRequest(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
