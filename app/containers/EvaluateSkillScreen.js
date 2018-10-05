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
    const { users, skill } = this.props.navigation.state.params;
    const { notes } = skill;

    if (!notes || !notes.length) {
      return (
        <View><Text>No notes</Text></View>
      );
    }

    return (
      notes.map((noteId) => {
        const noteData = this.props.navigation.state.params.notes[noteId];
        const {
          id, userId, createdDate, note,
        } = noteData;
        const { avatarUrl, name } = users[userId];

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
    const { name, criteria, questions = [] } = this.props.navigation.state.params.skill;
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

EvaluateSkillScreen.propTypes = {
  navigation: PropTypes.shape({
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
