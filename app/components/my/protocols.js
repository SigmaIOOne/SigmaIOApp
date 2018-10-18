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

export default class Protocols extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.contentTitle}>{I18n.t('my.protocolsPart._title1')}</Text>
                    <Text style={styles.contentTitle}>{I18n.t('my.protocolsPart._title2')}</Text>
                    <Image style={styles.img_1} source={require('../../assets/images/my/protocols_1.png')}/>
                    <Image style={styles.img_2} source={require('../../assets/images/my/protocols_2.png')}/>
                    <Image style={styles.img_3} source={require('../../assets/images/my/protocols_3.png')}/>
                    <Image style={styles.img_4} source={require('../../assets/images/my/protocols_4.png')}/>
                    <Image style={styles.img_5} source={require('../../assets/images/my/protocols_5.png')}/>
                    <Image style={styles.img_6} source={require('../../assets/images/my/protocols_6.png')}/>
                    <Image style={styles.img_7} source={require('../../assets/images/my/protocols_7.png')}/>
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
    img_1: {
        marginTop: scaleSize(28),
        width: scaleSize(750),
        height: scaleSize(2326),
    },
    img_2: {
        width: scaleSize(750),
        height: scaleSize(1836),
    },
    img_3: {
        width: scaleSize(750),
        height: scaleSize(2464),
    },
    img_4: {
        width: scaleSize(750),
        height: scaleSize(1666),
    },
    img_5: {
        width: scaleSize(750),
        height: scaleSize(2174),
    },
    img_6: {
        width: scaleSize(750),
        height: scaleSize(2078),
    },
    img_7: {
        width: scaleSize(750),
        height: scaleSize(1436),
    },
});
