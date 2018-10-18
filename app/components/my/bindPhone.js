import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';
import ServerPolicies from "./serverPolicies";

export default class BindPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            code: '',
            mnemonisAgree: false,
        }
    }

    _clickToCheck = () => {

    }

    render() {
        const { account, code, mnemonisAgree } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <View style={styles.inputViewLeft}>
                            <Text style={styles.inputLeftTxt}>{I18n.t('public.phone')}</Text>
                            <Input
                                placeholder={I18n.t('public.phonePlaceholder')}
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
                            <Text style={styles.inputLeftTxt}>{I18n.t('public.code')}</Text>
                            <Input
                                placeholder={I18n.t('public.codePlaceholder')}
                                placeholderTextColor="#BEBEBE"
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputStyle}
                                value={code}
                                onChangeText={(code) => { console.log('@@@ ', code); this.setState({code}) }}
                            />
                        </View>
                        <TouchableOpacity>
                            <View>
                                <Text style={styles.codeTxt}>{I18n.t('public.getCode')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.isAgree_flex}>
                        <CheckBox
                            title=" "
                            iconType="material"
                            checkedIcon="check-circle"
                            uncheckedIcon="check-circle"
                            checkedColor="#4A90E2"
                            checked={mnemonisAgree}
                            containerStyle={styles.checkBox}
                            onPress={() => {
                                this.setState({ mnemonisAgree: !mnemonisAgree });
                            }}
                        />
                        <Text style={styles.color_999}>
                            {I18n.t('wallet.iAgreeTerm')}
                            {/* 我已阅读并同意 */}
                            <Text
                                style={styles.color_aff}
                                onPress={() => this.props.navigation.navigate('ServerPolicies')}
                            >
                                {I18n.t('public.serverPolicies')}
                                {/* 《服务条款》 */}
                            </Text>
                        </Text>
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
        maxWidth: scaleSize(400),
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
        marginRight: scaleSize(68),
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
    codeTxt: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
    },
    firstInput: {
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#E6E6E6',
    },
    isAgree_flex: {
        width: scaleSize(750),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        paddingLeft: scaleSize(32),
    },
    checkBox: {
        padding: 0,
        marginLeft: 0,
        width: scaleSize(46),
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    color_999: {
        color: '#424559',
        // width: screen.width - 50
    },
    color_aff: {
        color: '#5077BC',
    }
});
