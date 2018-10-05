import PropTypes from 'prop-types';
import React from 'react';
import { ListItem } from 'react-native-elements';

class EvaluationItem extends React.PureComponent {
  render() {
    const {
      name, status, onPress,
    } = this.props;
    return (
      <ListItem
        key={`${name}-${status}`}
        title={name}
        subtitle={status}
        onPress={onPress}
      />
    );
  }
}

EvaluationItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EvaluationItem;
