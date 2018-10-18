import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import {I18n} from "../../../language/i18n";
import { scaleSize } from '../../utils/ScreenUtil';
import TextWidget from '../public/textWidget/textWidget';

export default class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            content: '',
        }
    }
    // 多行文本属性
    // textArea = {
    //     placeholder: I18n.t('my.suggestPart.textAreaPlaceholder'),
    //     multiline: true,
    //     style: styles.textAreaStyle,
    //     onChange: e => this.setState({content: e.nativeEvent.text}),
    //     value: this.state.content
    // }
    render() {
        const { account, content } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.areaView}>
                        <TextWidget
                            placeholder={I18n.t('my.suggestPart.textAreaPlaceholder')}
                            multiline={true}
                            style={styles.textAreaStyle}
                            value={content}
                            onChangeText={(content) => this.setState({content})}
                        />
                    </View>
                    <View style={styles.inputView}>
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
                        // 确认提取
                        title={I18n.t('public.check')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        buttonStyle={styles.btnStyle}
                        onPress={() => {}}
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
        paddingBottom: scaleSize(40),
        backgroundColor: '#FFFFFF',
    },
    areaView: {
        marginTop: scaleSize(100),
    },
    textAreaStyle: {
        width: scaleSize(686),
        minHeight: scaleSize(334),
        borderRadius: scaleSize(16),
        borderWidth: scaleSize(1),
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
        borderWidth: scaleSize(1),
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
