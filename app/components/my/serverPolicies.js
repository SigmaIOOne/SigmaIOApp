/**
 * 我的 -> 关于我们 -> 隐私条款
 */
import React from 'react';
import {
    Image,
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';

export default class ServerPolicies extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.contentTitle}>{I18n.t('my.serverPoliciesPart._title1')}</Text>
                    <Text style={styles.contentTitle}>{I18n.t('my.serverPoliciesPart._title2')}</Text>
                    <Image style={[styles.img, styles.img1]} source={require('../../assets/images/my/policy1.png')}/>
                    <Image style={[styles.img, styles.img2]} source={require('../../assets/images/my/policy2.png')}/>
                    <Image style={[styles.img, styles.img3]} source={require('../../assets/images/my/policy3.png')}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: scaleSize(40),
        paddingBottom: scaleSize(40),
        backgroundColor: '#FFFFFF',
    },
    contentTitle: {
        color: '#555555',
        fontSize: scaleSize(28),
    },
    img: {
        width: scaleSize(750),
    },
    img1: {
        marginTop: scaleSize(40),
        height: scaleSize(1782),
    },
    img2: {
        height: scaleSize(2262),
    },
    img3: {
        height: scaleSize(1724),
    },
});
