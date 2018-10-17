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
import { checkAccount, checkCode, checkImgCode } from '../../../utils/valiServices';
import Toast from '../../../utils/myToast';

export default class Registry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            imgTargetCode: '', // 存放随机生成的验证码
            imgCode: '',
            phoneCode: ''
        }
    }
    componentWillMount() {
        this._createRandomCode();
    }
    _clickToregister = () => {
        const { account, imgCode, imgTargetCode, phoneCode } = this.state;
        checkAccount(account)
            .then(() => checkImgCode(imgTargetCode, imgCode))
            .then(() => checkCode(phoneCode))
            .then(() => {
                this.props.navigation.navigate('SetNewPsd');
            })
            .catch(err => {
                this.toast.show(err);
            });
    }
    // 不找生成图片二维码的插件了，因为有手机验证码了，这个没必要弄,自己随便写个好了
    _createRandomCode = () => {
        const result = [];
        for(let i=0;i<4;i++) {
            const temp = [];
            temp[0]= String.fromCharCode(Math.floor(Math.random()*26+65)); //存放大写字母
            temp[1]= String.fromCharCode(Math.floor(Math.random()*26+97)); //存放小写字母
            temp[2]= String.fromCharCode(Math.floor(Math.random()*10+48)); //存放数字
            const n = Math.floor(Math.random()*3);
            result[i] = temp[n];
        }
        this.setState({
            imgTargetCode: result.join('')
        });
    }
    render() {
        const { account, imgCode, imgTargetCode, phoneCode } = this.state;
        return (
            <ScrollView>
                <ImageBackground style={styles.imgBg} source={require('../../../assets/images/sigm/login_bg.png')}>
                    <Image style={styles.loginLogo} source={require('../../../assets/images/sigm/login_logo.png')}/>
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.accountPlaceholder')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/phone_icon.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={account}
                        onChangeText={(account) => { this.setState({account}) }}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.imgCode')}
                        placeholderTextColor="rgba(255, 255, 255, .6)"
                        leftIcon={
                            <Image style={styles.inputIcon} source={require('../../../assets/images/sigm/img_code.png')}/>
                        }
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        rightIcon={
                            <View>
                                <View style={styles.imgCode}>
                                    <Text style={styles.imgCodeTxt}>{imgTargetCode}</Text>
                                </View>
                            </View>
                        }
                        rightIconContainerStyle={styles.imgRightIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={imgCode}
                        onChangeText={(imgCode) => this.setState({imgCode})}
                    />
                    <Input
                        placeholder={I18n.t('sigm.loginPart.registryPart.phoneCode')}
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
                        value={phoneCode}
                        onChangeText={(phoneCode) => this.setState({phoneCode})}
                    />
                    <Button
                        title={I18n.t('sigm.loginPart.registryPart.registryBtn')}
                        // "下一步"
                        buttonStyle={styles.loginBtnStyle}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(38)}}
                        onPress={() => this._clickToregister()}
                    />
                    <View style={[styles.flexRow]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FindPsd')}>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.findPsdBtn')}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.loginBottomText, styles.splitLine]}>|</Text>
                        <TouchableOpacity>
                            <Text style={[styles.loginBottomText]}>{I18n.t('sigm.loginPart.registerBtn')}</Text>
                        </TouchableOpacity>
                    </View>
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
    imgRightIconContainerStyle: {
        marginRight: scaleSize(24),
        width: scaleSize(100),
    },
    imgCode: {
        borderColor: '#FFFFFF',
        borderWidth: scaleSize(2),
        borderRadius: scaleSize(4),
        padding: scaleSize(4),
    },
    imgCodeTxt: {
        color: '#FFFFFF',
        fontSize: scaleSize(30),
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
