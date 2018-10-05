import PropTypes from 'prop-types';
import React from 'react';
import {
  Text, TouchableHighlight, View, ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Styles, { highlightUnderlayColor } from './styles/ListItemStyles';

class ListItem extends React.PureComponent {
  render() {
    const {
      containerStyle = {}, onPress, title, titleStyle = {}, subtitle, subtitleStyle = {}, titleNumberOfLines,
    } = this.props;

    return (
      <View style={containerStyle}>
        <TouchableHighlight
          style={Styles.listItem}
          activeOpacity={1}
          onPress={onPress}
          underlayColor={highlightUnderlayColor}
          disabled={!onPress}
        >
          <View style={Styles.listItemContents}>
            <View style={Styles.listItemText}>
              <Text style={[Styles.listTitle, titleStyle]} numberOfLines={titleNumberOfLines}>{title}</Text>
              {subtitle && (
                <Text style={[Styles.listSubtitle, subtitleStyle]}>{subtitle}</Text>
              )}
            </View>
            <Icon style={Styles.listItemIcon} name="chevron-right" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleNumberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  subtitleStyle: Text.propTypes.style,
};

export default ListItem;
