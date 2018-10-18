import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';

export default class Certificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            id: '',
        }
    }

    _clickToCheck = () => {

    }

    render() {
        const { account, id } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <View style={styles.inputViewLeft}>
                            <Text style={styles.inputLeftTxt}>{I18n.t('my.securityPart.certificatePart.name')}</Text>
                            <Input
                                placeholder={I18n.t('my.securityPart.certificatePart.namePlaceholder')}
                                placeholderTextColor="#BEBEBE"
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputStyle}
                                value={account}
                                onChangeText={(account) => { console.log('@ ', account); this.setState({account}) }}
                            />
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputViewLeft}>
                            <Text style={styles.inputLeftTxt}>{I18n.t('my.securityPart.certificatePart.certificateId')}</Text>
                            <Input
                                placeholder={I18n.t('my.securityPart.certificatePart.certificateIdPlaceholder')}
                                placeholderTextColor="#BEBEBE"
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputStyle}
                                value={id}
                                onChangeText={(id) => { console.log('@@@ ', id); this.setState({id}) }}
                            />
                        </View>
                    </View>
                    <Button
                        title={I18n.t('public.check')}
                        // "确认"
                        buttonStyle={styles.checkBtnStyle}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        onPress={() => this._clickToCheck()}
                    />
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
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        width: scaleSize(750),
        height: scaleSize(90),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
    inputViewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBtnStyle: {
        width: scaleSize(654),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginTop: Dimensions.get('window').height / 2,
        marginBottom: scaleSize(94),
    },
    inputLeftTxt: {
        color: 'rgba(85, 85, 85, .8)',
        fontSize: scaleSize(30),
        width: scaleSize(170),
        marginRight: scaleSize(84),
    },
    inputStyle: {
        color: 'rgba(85, 85, 85, .8)',
        fontSize: scaleSize(30),
    },
    inputContainerStyle: {
        width: scaleSize(220),
        height: scaleSize(30),
        borderBottomWidth: 0,
    },
    firstInput: {
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
});
