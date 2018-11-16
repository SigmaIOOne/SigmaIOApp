/**
 * 我的 -> 意见反馈
 */
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';

import { I18n } from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';
import { checkSuggestAccount, checkSuggestContent } from '../../utils/valiServices';
import Toast from '../../utils/myToast';
import TextWidget from '../public/textWidget/textWidget';
import { sendSuggest } from '../../api/my';

export default class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            content: '',
            btnDisabled: false, // 用来防止多次发送意见
        }
    }
    // 发送意见
    _sendSuggest = async () => {
        try {
            const { account, content } = this.state;
            await checkSuggestAccount(account);
            await checkSuggestContent(content);
            await this.setState({btnDisabled: true});
            let result = await sendSuggest(account, content);
            console.log('res ', result);
            result = result.data;
            // 别用===了，因为有些接口返回status是数字，有些是字符串
            result.status == 200 ? this.props.navigation.goBack() : await Promise.reject(result.msg);
        }
        catch (err) {
            this.setState({btnDisabled: false});
            this.toast.show(err);
        }
    }
    render() {
        const { account, content, btnDisabled } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.areaView}>
                        {/* 意见内容 */}
                        <TextWidget
                            placeholder={I18n.t('my.suggestPart.textAreaPlaceholder')}
                            multiline={true}
                            style={styles.textAreaStyle}
                            value={content}
                            onChangeText={(content) => this.setState({content})}
                        />
                    </View>
                    <View style={styles.inputView}>
                        {/* QQ/手机号/邮箱 */}
                        <Input
                            placeholder={I18n.t('my.suggestPart.inputPlaceholder')}
                            placeholderTextColor="#BEBEBE"
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            value={account}
                            onChangeText={(account) => this.setState({account})}
                        />
                    </View>
                    <Button
                        // 确认
                        title={I18n.t('public.check')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        buttonStyle={styles.btnStyle}
                        onPress={() => this._sendSuggest()}
                        disabled={btnDisabled}
                    />
                    <Toast onRef={toast => this.toast = toast}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height - StatusBar.currentHeight,
    },
    areaView: {
        marginTop: scaleSize(100),
    },
    textAreaStyle: {
        width: scaleSize(686),
        minHeight: scaleSize(334),
        borderRadius: scaleSize(16),
        borderWidth: scaleSize(2),
        borderColor: '#BEBEBE',
        padding: scaleSize(40),
        textAlignVertical: 'top',
        fontSize: scaleSize(32),
        color: '#BEBEBE',
    },
    inputView: {
        marginTop: scaleSize(48),
    },
    inputStyle: {
        fontSize: scaleSize(32),
        color: '#BEBEBE',
    },
    inputContainerStyle: {
        width: scaleSize(686),
        height: scaleSize(84),
        borderRadius: scaleSize(16),
        borderWidth: scaleSize(2),
        borderColor: '#BEBEBE',
    },
    btnStyle: {
        width: scaleSize(654),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginTop: scaleSize(458),
        marginBottom: scaleSize(58),
    },
});
