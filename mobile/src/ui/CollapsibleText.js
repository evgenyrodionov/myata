import React, { PureComponent } from 'react';
import {
  Text, View, LayoutAnimation, Platform, UIManager,
} from 'react-native';

class TextCollapse extends PureComponent {
  static defaultProps = {
    initialTextLength: 70,
    collapseDuration: 250,
    collapseType: 'spring',
    springDamping: 0.7,
    showMoreTextStyle: {
      color: '#858585',
      paddingLeft: 10,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
    if (
      Platform.OS === 'android'
      && UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const { collapseDuration, collapseType, springDamping } = this.props;

    this.LayoutAnimation = {
      duration: collapseDuration,
      create: {
        type: LayoutAnimation.Types[collapseType],
        property: LayoutAnimation.Properties.scaleY,
      },
      update: {
        type: LayoutAnimation.Types[collapseType],
        springDamping,
      },
    };
  }

  toggleShowMore = () => {
    const { showMore } = this.state;
    LayoutAnimation.configureNext(this.LayoutAnimation);
    this.setState({ showMore: !showMore });
  };

  render() {
    const { showMore } = this.state;
    const {
      text,
      textStyle,
      initialTextLength,
      showMoreTextStyle,
      containerStyle,
    } = this.props;
    const shouldTrimmed = text.length > initialTextLength;
    const trimmedText = shouldTrimmed
      ? `${text.substring(0, initialTextLength)}...`
      : text;

    return (
      <View style={{ width: '100%', overflow: 'hidden' }}>
        <View style={containerStyle}>
          <Text style={textStyle} onPress={this.toggleShowMore}>
            {showMore ? text : trimmedText}
            {shouldTrimmed && (
              <Text style={showMoreTextStyle}>
                {showMore ? 'скрыть' : 'ещё'}
              </Text>
            )}
          </Text>
        </View>
      </View>
    );
  }
}

export default TextCollapse;
