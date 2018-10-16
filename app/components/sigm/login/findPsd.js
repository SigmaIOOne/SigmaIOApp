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
// import { Input, Button } from 'native-base';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';

import { I18n } from '../../../../language/i18n';
import { scaleSize } from '../../../utils/ScreenUtil';
import { checkAccount } from '../../../utils/valiServices';
import Toast from '../../../utils/myToast';

export default class FindPsd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            psd: ''
        }
    }
    _clickToNext = () => {
        const { account, psd } = this.state;
        checkAccount(account)
            .then(() => {
                this.props.navigation.navigate('SetNewPsd');
            })
            .catch(err => {
                this.toast.show(err);
            });
    }
    render() {
        const { account, psd } = this.state;
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../../assets/images/sigm/login_logo.png')}/>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.findPsdPart.accountPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={account}
                        onChangeText={(account) => { console.log('@ ', account); this.setState({account}) }}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.findPsdPart.codePlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/psd_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        rightIcon={
                            <TouchableOpacity>
                                <View>
                                    <Text style={styles.codeTxt}>{I18n.t('sigm.loginPart.findPsdPart.getCode')}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        rightIconContainerStyle={styles.rightIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={psd}
                        onChangeText={(psd) => this.setState({psd})}
                    />
                    <Button
                        title={I18n.t('public.next')}
                        // "下一步"
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToNext()}
                    />
                    <Toast onRef={toast => this.toast = toast} position="center" />
                </ImageBackground>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    imgBg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - scaleSize(40),
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    loginLogo: {
        width: scaleSize(160),
        height: scaleSize(208),
        marginTop: scaleSize(80),
        marginBottom: scaleSize(80),
    },
    inputIcon: {
        width: scaleSize(32),
        height: scaleSize(36),
    },
    leftIconContainerStyle: {
        // width: scaleSize(28),
    },
    rightIconContainerStyle: {
        marginRight: scaleSize(24),
        width: scaleSize(180),
    },
    codeTxt: {
        color: '#FFFFFF',
        fontSize: scaleSize(34),
    },
    inputStyle: {
        fontSize: scaleSize(32),
        color: 'rgba(255, 255, 255, 0.6)'
    },
    inputContainerStyle: {
        width: scaleSize(686),
        height: scaleSize(84),
        borderRadius: scaleSize(12),
        backgroundColor: 'rgba(255, 255, 255, .2)',
        borderBottomWidth: 0,
        marginBottom: scaleSize(16),
    },
    loginBtnStyle: {
        width: scaleSize(600),
        height: scaleSize(84),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: scaleSize(24),
        marginTop: Dimensions.get('window').height / 2 - scaleSize(180),
        marginBottom: scaleSize(24),
    }
});
