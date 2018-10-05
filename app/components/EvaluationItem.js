import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, View,
} from 'react-native';

class EvaluationItem extends React.PureComponent {
  render() {
    const {
      name, status,
    } = this.props;
    return (
      <View>
        <View>
          <Text numberOfLines={1}>{name}</Text>
        </View>
        <View>
          <Text>{status.toUpperCase()}</Text>
        </View>
      </View>
    );
  }
}

EvaluationItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default EvaluationItem;
