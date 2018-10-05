import PropTypes from 'prop-types';
import React from 'react';
import {
  Image, Text, View, ViewPropTypes,
} from 'react-native';
import moment from 'moment';
import Styles from './styles/NoteStyles';

class Notes extends React.PureComponent {
  render() {
    const {
      containerStyle = {}, avatarUrl, name, createdDate, text,
    } = this.props;
    const date = moment(createdDate).format('D MMM, YYYY');

    return (
      <View style={containerStyle}>
        <View style={Styles.note}>
          <View style={Styles.avatar}>
            <Image style={Styles.avatarImage} source={{ uri: avatarUrl }} />
          </View>
          <View style={Styles.textContainer}>
            <Text style={Styles.name}>{name}</Text>
            <Text style={Styles.date}>{date}</Text>
            <Text style={Styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Notes.propTypes = {
  text: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

export default Notes;
