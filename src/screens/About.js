import React from 'react';
import { View, Linking, Text, StyleSheet, ScrollView } from 'react-native';
import NavigationOptions from '../config/NavigationOptions';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { FontSizes } from '../constants';
import { BoldText, RegularText, MediumText } from '../components/StyledText';
import ParsedText from 'react-native-parsed-text';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import i18n from "../../i18n";

// About info, link to website/fb/twitter
// maybe a url for the /songs page on website (where App Store/Google Play icons will be found)
// Email to send feedback?

class About extends React.Component {
  static navigationOptions = {
    title: i18n.t('screens.about.title'),
    ...NavigationOptions
  };

  state = {
    pushToken: "",
    response: null
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.globalData.state.pushToken &&
      this.props.globalData.state.pushToken) ||
      (!prevProps.globalData.state.response &&
        this.props.globalData.state.response)
    ) {
      this.setData();
    }
  }

  setData = () => {
    let { pushToken, response } = this.props.globalData.state
    this.setState({pushToken, response})
  }

  _urlPress = (url) => {
    WebBrowser.openBrowserAsync(url);
  }

  _emailPress = (email) => {
    Linking.openURL('mailto:' + email);
  }

  _renderFormatted = (matchingString) => {
    return matchingString.slice(1, matchingString.length-1)
  }

  render() {
    let creditsTexts = []
    let creditsItems = i18n.t('screens.about.credits')
    creditsItems.forEach(element => {
      creditsTexts.push(
        <ParsedText 
          parse={
            [
              {type: 'url', style: styles.url, onPress: this._urlPress}, 
              {type: 'email', style: styles.url, onPress: this._emailPress},
              {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
              {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
            ]
          }
          style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}
          >
          {element}
        </ParsedText>
      )
    });

    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky, flexDirection: i18n.getFlexDirection() }}>
        <ScrollView style={{ flex: 1, backgroundColor: Palette.White, padding: 5 }}>
          <BoldText style={{ fontSize: FontSizes.title, marginBottom: 10, textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.appTitle')}</BoldText>
          <ParsedText 
            parse={
              [
                {type: 'url', style: styles.url, onPress: this._urlPress}, 
                {type: 'email', style: styles.url, onPress: this._emailPress},
                {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
                {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
              ]
            }
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}
            >
            {i18n.t('screens.about.why')}
          </ParsedText>
          <View style={{ height: 10 }} />
          <ParsedText 
            parse={
              [
                {type: 'url', style: styles.url, onPress: this._urlPress}, 
                {type: 'email', style: styles.url, onPress: this._emailPress},
                {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
                {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
              ]
            }
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}
            >
            {i18n.t('screens.about.feedback')}
          </ParsedText>
          <View style={{ height: 20 }} />
          <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.creditsheading')}</MediumText>
          {creditsTexts}
          <View style={{ height: 20 }} />
          <ParsedText 
            parse={
              [
                {type: 'url', style: styles.url, onPress: this._urlPress}, 
                {type: 'email', style: styles.url, onPress: this._emailPress},
                {pattern: /(\*)(.*?)\1/, style: styles.bold, renderText: this._renderFormatted},
                {pattern: /(_)(.*?)\1/, style: styles.italic, renderText: this._renderFormatted}
              ]
            }
            style={[styles.credits, { textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }]}
            >
            {i18n.t('screens.about.contribute')}
          </ParsedText>
          <View style={{ height: 20 }} />
          <ScrollView style={{flex: 1}}>
            <MediumText style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{i18n.t('screens.about.debug')}</MediumText>
            <RegularText selectable={true} style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>{this.state.pushToken}</RegularText>
            <RegularText selectable={true} style={{ textAlign: i18n.getRTLTextAlign(), writingDirection: i18n.getWritingDirection() }}>
              {
                this.state.response ? 
                  JSON.stringify(this.state.response) : ''
              }
            </RegularText>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  credits: {
    fontFamily: Skin.Font_ParsedText,
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default withUnstated(About, { globalData: GlobalDataContainer });