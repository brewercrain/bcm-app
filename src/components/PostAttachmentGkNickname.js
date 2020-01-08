import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { BoldText, RegularText } from './StyledText';
import { FontSizes } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import i18n from "../../i18n"

export default class PostAttachmentGkNickname extends React.Component {
    render() {
        const gkNickname = this.props.gkNickname;

        return (
            <View
                style={{
                    flexDirection: i18n.getFlexDirection(), alignItems: 'center',
                    backgroundColor: gkNickname.backgroundColor,
                    paddingVertical: 5, paddingHorizontal: 10
                }}>
                <Ionicons
                    name="md-hand"
                    size={23}
                    style={{
                        color: gkNickname.textColor,
                        backgroundColor: 'transparent',
                        marginHorizontal: 5,
                    }} />
                <RegularText style={[styles.text, { color: gkNickname.textColor }]}>
                    {i18n.t('components.gkNickname.gonnascore')}
                </RegularText>
                <BoldText style={[styles.nickname, { color: gkNickname.textColor }]}>
                    {gkNickname.nickname}
                </BoldText>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: FontSizes.subtitle
    },
    nickname: {
        fontSize: FontSizes.subtitle,
        marginRight: 5
    }
});