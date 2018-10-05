/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import connect from 'react-redux/es/connect/connect';
import { Button } from 'react-native-elements';
// Styles
import Styles from './styles/EvaluateSkillScreenStyles';
import { systemColors } from '../themes/Colors';
import Metrics from '../themes/Metrics';
import SkillDetail from '../components/SkillDetail';

const YES_VALUE = 'yes';
const NO_VALUE = 'no';
const MAYBE_VALUE = 'maybe';
const OBJECTIVE_VALUE = 'objective';

const actionColors = {
  [YES_VALUE]: systemColors.skillYes,
  [NO_VALUE]: systemColors.skillNo,
  [MAYBE_VALUE]: systemColors.skillMaybe,
  [OBJECTIVE_VALUE]: systemColors.skillObjective,
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomLayoutAnimation = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};


/* eslint-disable react/no-array-index-key */
class EvaluateSkillScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Evaluation'),
  });

  state = {
    bgColor: '#ffffff',
    showLoading: false,
  };

  onEvaluatePress = (action) => {
    LayoutAnimation.configureNext(CustomLayoutAnimation, null);
    const bgColor = actionColors[action];

    this.setState(() => ({
      bgColor,
      showLoading: true,
    }));
  };

  render() {
    const {
      name, criteria, questions = [], notes: skillNotes = [],
    } = this.props.navigation.state.params.skill;

    const users = this.props.navigation.getParam('users', []);

    const notesWithDataAndAvatars = skillNotes.map((noteId) => this.props.navigation.getParam('notes', [])[noteId]).map((note) => {
      const { avatarUrl, name: fullName } = users[note.userId];

      return ({
        avatarUrl,
        name: fullName,
        ...note,
      });
    });

    return (
      <SafeAreaView style={Styles.container}>
        <SkillDetail
          containerStyle={Styles.skillDetailContainer}
          name={name}
          criteria={criteria}
          questions={questions}
          notes={notesWithDataAndAvatars}
        />
        <View style={Styles.actionsContainer}>
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={() => this.onEvaluatePress(NO_VALUE)}
            backgroundColor={systemColors.primaryButton}
            title="No"
            buttonStyle={[Styles.actionButton, Styles.actionButtonNo]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={() => this.onEvaluatePress(YES_VALUE)}
            backgroundColor={systemColors.primaryButton}
            title="Yes"
            buttonStyle={[Styles.actionButton, Styles.actionButtonYes]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={() => this.onEvaluatePress(MAYBE_VALUE)}
            backgroundColor={systemColors.primaryButton}
            title="Not sure"
            buttonStyle={[Styles.actionButton, Styles.actionButtonMaybe]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={() => this.onEvaluatePress(OBJECTIVE_VALUE)}
            backgroundColor={systemColors.primaryButton}
            title="Objective"
            buttonStyle={[Styles.actionButton, Styles.actionButtonObjective]}
            textStyle={Styles.actionButtonText}
          />
        </View>
        <View style={[{
          position: 'absolute',
          right: this.state.showLoading ? 0 : '50%',
          bottom: this.state.showLoading ? 0 : '50%',
          height: this.state.showLoading ? Metrics.screenHeight : 0,
          width: this.state.showLoading ? Metrics.screenWidth : 0,
          backgroundColor: this.state.bgColor,
          borderRadius: this.state.showLoading ? 0 : 1000,
        }]}
        />
      </SafeAreaView>
    );
  }
}

EvaluateSkillScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        notes: PropTypes.shape(),
        users: PropTypes.shape(),
        title: PropTypes.string.isRequired,
        skill: PropTypes.shape({
          name: PropTypes.string,
          criteria: PropTypes.string,
          questions: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
          })),
          notes: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, null)(EvaluateSkillScreen);
