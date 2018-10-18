import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';

export default class ServerPolicies extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.contentTxt}>
                        {I18n.t('my.serverPoliciesPart.content')}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: scaleSize(40),
    },
    contentTxt: {
        width: scaleSize(670),
    }
});
