/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import connect from 'react-redux/es/connect/connect';
import { EVALUATION_SCREEN } from '../navigation';
import ListItem from '../components/ListItem';

// Styles
import Styles from './styles/HomeScreenStyles';
import { systemColors } from '../themes/Colors';

const EVALUATION_STATUS_COMPLETE = 'COMPLETE';


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
    const { template, status } = item;
    const name = template && template.name;

    const subtitleStyle = status === EVALUATION_STATUS_COMPLETE ? Styles.evaluationSubtitleComplete : Styles.evaluationSubtitleInProgress;

    return (
      <ListItem
        title={name}
        subtitle={status}
        onPress={() => this.props.navigation.navigate(EVALUATION_SCREEN, { id: item.id })}
        subtitleStyle={subtitleStyle}
      />
    );
  };

  render() {
    const myEvaluations = this.props.evaluationsData;

    return (
      <View style={Styles.container}>
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
  evaluationsData: PropTypes.arrayOf(PropTypes.shape({
    createdDate: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    subject: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    template: PropTypes.shape(),
    viewer: PropTypes.string,
  })),
};
const mapStateToProps = ({ evaluations: { evaluationsData } }) => ({
  evaluationsData,
});

const mapDispatchToProps = ({ user: { logoutRequest } }) => ({
  logout: () => logoutRequest(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
