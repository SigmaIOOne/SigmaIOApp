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
                    <Image style={styles.img} source={require('../../assets/images/my/policy.png')}/>
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
        marginTop: scaleSize(40),
        width: scaleSize(750),
        height: scaleSize(5768),
    }
});
