/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import connect from 'react-redux/es/connect/connect';
import { Button } from 'react-native-elements';
import Note from '../components/Note';
// Styles
import Styles from './styles/EvaluateSkillScreenStyles';
import { systemColors } from '../themes/Colors';

/* eslint-disable react/no-array-index-key */
class EvaluateSkillScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Evaluation'),
  });

  renderNotes = () => {
    const { notes } = this.props.skill;
    if (!notes.length) {
      return (
        <View><Text>No notes</Text></View>
      );
    }

    return (
      notes.map((noteId) => {
        const noteData = this.props.notes[noteId];
        const {
          id, userId, createdDate, note,
        } = noteData;
        const { avatarUrl, name } = this.props.users[userId];

        return (
          <Note
            key={id}
            containerStyle={Styles.noteContainer}
            avatarUrl={avatarUrl}
            name={name}
            createdDate={createdDate}
            text={note}
          />);
      })
    );
  };

  render() {
    const { name, criteria, questions = [] } = this.props.skill;
    return (
      <SafeAreaView style={Styles.container}>
        <ScrollView style={Styles.scrollContainer}>
          <View style={Styles.skillContainer}>
            <Text style={Styles.title}>{name}</Text>
            <Text style={Styles.criteria}>{criteria}</Text>
            { questions && questions.map(({ title }, index) => (
              <View style={Styles.questionContainer} key={`${title}_${index}`}>
                <Text style={Styles.questionBullet}>-</Text>
                <Text style={Styles.question}>{title}</Text>
              </View>
            ))}
          </View>
          <View style={Styles.notesContainer}>
            <Text style={Styles.title}>Notes</Text>
            {this.renderNotes()}
          </View>
        </ScrollView>
        <View style={Styles.actionsContainer}>
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={this.onLogoutPress}
            backgroundColor={systemColors.primaryButton}
            title="No"
            buttonStyle={[Styles.actionButton, Styles.actionButtonNo]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={this.onLogoutPress}
            backgroundColor={systemColors.primaryButton}
            title="Yes"
            buttonStyle={[Styles.actionButton, Styles.actionButtonYes]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={this.onLogoutPress}
            backgroundColor={systemColors.primaryButton}
            title="Not sure"
            buttonStyle={[Styles.actionButton, Styles.actionButtonMaybe]}
            textStyle={Styles.actionButtonText}
          />
          <Button
            containerViewStyle={Styles.actionButtonContainer}
            onPress={this.onLogoutPress}
            backgroundColor={systemColors.primaryButton}
            title="Objective"
            buttonStyle={[Styles.actionButton, Styles.actionButtonObjective]}
            textStyle={Styles.actionButtonText}
          />
        </View>
      </SafeAreaView>
    );
  }
}

EvaluateSkillScreen.defaultProps = {
  skill: {
    id: 597,
    name: 'Maintains technical responsibility for all the stages and iterations of an epic or feature',
    version: 1,
    criteria: 'Has led the planning execution of an epic or feature from kick-off through to production.',
    type: 'skill',
    questions: [
      {
        title: 'Do you create a plan for delivering an epic or feature and run it past your team?',
      },
      {
        title: 'Have you successfully delivered an epic/feature without leaning heavily on the more experienced members of your team?',
      },
      {
        title: 'Have you planned delivery in such a way to keep stakeholders up to date with progress?',
      },
    ],
    attribution: null,
    status: {
      previous: 'NEW',
      current: 'ATTAINED',
    },
    notes: [
      '5bb3526a5a3c2c0050f8528e',
      '59e47efd3b3dec00b1b8990a',
    ],
  },
  notes: {
    '5bb3526a5a3c2c0050f8528e': {
      id: '59df32bf10f29600b67810e5',
      userId: '5a4f3e4d017eb992b3177c79',
      skillId: 226,
      note: 'I understand the important and techniques required however, I haven\'t had that many opportunities to demonstrate.',
      createdDate: '2017-10-12T09:15:43.020Z',
    },
    '59e47efd3b3dec00b1b8990a': {
      id: '59e47efd3b3dec00b1b8990a',
      userId: '5a4ce349017eb992b30bfbb6',
      skillId: 215,
      note: 'Keen to stay on after implementation, and not just head off to a new project. Opportunity to validate hypotheses, and learn from the data, and make new hypotheses',
      createdDate: '2017-10-16T09:42:21.327Z',
    },
  },
  users: {
    '5a4f3e4d017eb992b3177c79': {
      id: '5a4f3e4d017eb992b3177c79',
      name: 'Chris Cheshire',
      username: 'cjcheshire',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/437963?v=4',
    },
    '5a4ce349017eb992b30bfbb6': {
      id: '5a4ce349017eb992b30bfbb6',
      name: 'Andy Duncan',
      username: 'andy-duncan',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/17703678?v=4',
    },
    '5a4ef699017eb992b3161db4': {
      id: '5a4ef699017eb992b3161db4',
      name: 'Gabriel Cebrian',
      username: 'gabceb',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/470852?v=4',
    },
  },
};

EvaluateSkillScreen.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string,
    criteria: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
    })),
    notes: PropTypes.arrayOf(PropTypes.string),
  }),
  notes: PropTypes.shape(),
  users: PropTypes.shape(),
  navigation: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
const mapStateToProps = () => ({});

const mapDispatchToProps = ({ user: { logoutRequest } }) => ({
  logout: () => logoutRequest(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaluateSkillScreen);
