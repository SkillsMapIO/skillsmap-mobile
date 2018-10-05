import PropTypes from 'prop-types';
import React from 'react';
import {
  ScrollView, Text, View, ViewPropTypes,
} from 'react-native';
import Styles from './styles/SkillDetailStyles';
import Note from './Note';

class SkillDetail extends React.PureComponent {
  renderNotes = () => {
    const { notes } = this.props;

    if (!notes || !notes.length) {
      return (
        <View><Text>No notes</Text></View>
      );
    }

    return (
      notes.map(({
        id, createdDate, note, avatarUrl, name,
      }) => (
        <Note
          key={id}
          containerStyle={Styles.noteContainer}
          avatarUrl={avatarUrl}
          name={name}
          createdDate={createdDate}
          text={note}
        />))
    );
  };

  render() {
    const {
      containerStyle = {}, name, criteria, questions,
    } = this.props;

    return (
      <View style={containerStyle}>
        <ScrollView style={Styles.scrollContainer}>
          <View style={Styles.skillContainer}>
            <Text style={Styles.title}>{name}</Text>
            <Text style={Styles.criteria}>{criteria}</Text>
            {questions && questions.map(({ title }, index) => (
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
      </View>
    );
  }
}

SkillDetail.propTypes = {
  name: PropTypes.string.isRequired,
  criteria: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  notes: PropTypes.arrayOf(PropTypes.shape()),
  containerStyle: ViewPropTypes.style,
};

export default SkillDetail;
