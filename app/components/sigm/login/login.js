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

export default class Login extends React.Component {
    render() {
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../../assets/images/sigm/login_bg.png')}>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.phonePlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.phonePlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/psd_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />
                    <Button
                        title={I18n.t('sigm.loginPart.loginBtn')}
                        // "立即登录"
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => {
                        }}
                    />
                    <View style={[styles.flexRow]}>
                        <TouchableOpacity>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.findPsdBtn')}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.loginBottomText, styles.splitLine]}>|</Text>
                        <TouchableOpacity>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.registerBtn')}</Text>
                        </TouchableOpacity>
                    </View>
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
    inputIcon: {
        width: scaleSize(32),
        height: scaleSize(36),
    },
    leftIconContainerStyle: {
        // width: scaleSize(28),
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
        marginTop: scaleSize(498),
        marginBottom: scaleSize(24),
    },
    loginBottomText: {
        color: '#FFFFFF',
        lineHeight: scaleSize(84),
        fontSize: scaleSize(32),
    },
    splitLine: {
        marginLeft: scaleSize(40),
        marginRight: scaleSize(40),
    }
});
