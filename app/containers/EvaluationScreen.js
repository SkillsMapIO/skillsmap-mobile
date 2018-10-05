/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import connect from 'react-redux/es/connect/connect';
import { EVALUATE_SKILL_SCREEN } from '../navigation';

// Styles
import Styles from './styles/EvaluationScreenStyles';
import { systemColors } from '../themes/Colors';

class HomeScreen extends React.Component {
  rendersKillGroup = ({ item }) => {
    const { category, level, skills } = item;
    const key = `${category}-${level}`;
    const skillIdToOpen = skills[0];
    const skillToOpen = this.props.currentEvaluation.skills[skillIdToOpen];

    const onPress = () => {
      if (!skillToOpen) {
        return;
      }

      this.props.navigation.navigate(EVALUATE_SKILL_SCREEN, {
        skill: skillToOpen,
        notes: this.props.currentEvaluation.notes,
        users: this.props.currentEvaluation.users,
        title: skillToOpen.name,
      });
    };

    return (
      <ListItem
        key={key}
        title={category}
        subtitle={level}
        onPress={onPress}
        badge={{ value: skills.length, containerStyle: Styles.itemBadgeContainer }}
      />
    );
  };

  render() {
    const { id } = this.props.navigation.state.params;
    const { currentEvaluation } = this.props;

    if (!currentEvaluation) {
      this.props.fetchEvaluation(id);

      return null;
    }

    if (currentEvaluation.loading) {
      return (<ActivityIndicator style={Styles.loading} animating color={systemColors.primaryButton} size="large" />);
    }

    if (currentEvaluation.error) {
      return (<Text>There was an error</Text>);
    }

    const skillGroups = Object.values(currentEvaluation.skillGroups || {});

    return (
      <View style={Styles.container}>
        <FlatList
          style={Styles.skillsGroupList}
          data={skillGroups}
          keyExtractor={(item, i) => `${item.id}_${i}`}
          renderItem={this.rendersKillGroup}
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
  currentEvaluation: PropTypes.shape({
    skillGroups: PropTypes.shape(),
    skills: PropTypes.shape(),
    notes: PropTypes.shape(),
    users: PropTypes.shape(),
  }),
  fetchEvaluation: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
  currentEvaluation: state.evaluations.evaluationDetails[ownProps.navigation.state.params.id],
});

const mapDispatchToProps = ({ evaluations: { fetchEvaluationDetails } }) => ({
  fetchEvaluation: (id) => fetchEvaluationDetails({ id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
