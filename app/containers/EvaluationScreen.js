/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator, SectionList, Text, View,
} from 'react-native';

import connect from 'react-redux/es/connect/connect';
import { EVALUATE_SKILL_SCREEN } from '../navigation';
import ListItem from '../components/ListItem';

// Styles
import Styles from './styles/EvaluationScreenStyles';
import Colors from '../themes/Colors';

const STATUS_ATTAINED = 'attained';

class HomeScreen extends React.Component {
  renderSkillGroup = ({ item, section }) => {
    const { skill } = item;
    const { name, status } = skill;

    const onPress = () => {
      if (!skill) {
        return;
      }

      this.props.navigation.navigate(EVALUATE_SKILL_SCREEN, {
        skill,
        notes: this.props.currentEvaluation.notes,
        users: this.props.currentEvaluation.users,
        title: section.title,
      });
    };

    return (
      <ListItem
        title={name}
        titleNumberOfLines={3}
        subtitle={status.current && status.current}
        onPress={onPress}
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
      return (<ActivityIndicator style={Styles.loading} animating color={Colors.cornflowerblue} size="large" />);
    }

    if (currentEvaluation.error) {
      return (<Text>There was an error</Text>);
    }

    const sectionData = Object.values(currentEvaluation.skillGroups || {}).map((group) => {
      const skills = group.skills.map((skillId) => ({ skillId, skill: this.props.currentEvaluation.skills[skillId] }));
      const progress = skills.filter(({ skill: { status } }) => status.current && status.current.toLowerCase() === STATUS_ATTAINED);

      return ({
        id: group.id,
        title: `${group.category}`,
        level: group.level,
        progress: progress.length / skills.length * 100,
        data: skills,
      });
    });

    return (
      <View style={Styles.container}>
        <SectionList
          style={Styles.skillsGroupList}
          sections={sectionData}
          keyExtractor={(item, i) => (`${item.id}_${i}`)}
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => <View style={Styles.listItemSpacer} />}
          renderSectionHeader={({ section: { title, level, progress } }) => (
            <View style={Styles.sectionHeader}>
              <Text style={Styles.sectionHeaderTitle}>{title}</Text>
              <Text style={Styles.sectionHeaderLevel}>{level}</Text>
              <View style={Styles.progressBar}><View
                style={[Styles.progressBarValue, { width: `${progress}%` }]}
              />
              </View>
            </View>
          )}
          renderItem={this.renderSkillGroup}
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
