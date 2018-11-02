/**
 * 我的 -> 消息中心
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { getMessageList } from '../../api/my';
import { setMessageList } from '../../store/reducers/data';
import Toast from '../../utils/myToast';
import Spinner from '../../utils/mySpinner';
import NoNetworkPage from '../public/noNetworkPage';

class MessageCenter extends Component {
    static propTypes = {
        data: PropTypes.object,
        netInfo: PropTypes.object,
        setMessageList: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }
    componentDidMount() {
        // 不用willMount是防止那个toast还没有被渲染出来，然后需要有报错提示
        this._init();
    }
    componentWillReceiveProps(nextProps) {
        // 没网情况下要把加载中停止掉
        if (!this.state.isLoaded && !nextProps.netInfo.isConnected) this.setState({isLoaded: true});
    }
    // 页面初始化和刷新用
    _init = () => {
        this._getMessageList();
    }
    // 获取消息列表
    _getMessageList = async () => {
        try {
            let result = await getMessageList();
            result = result.data;
            console.log('message ', result);
            if (result.status == 200) {
                this.props.setMessageList(result.data);
                this.setState({
                    isLoaded: true,
                });
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    _renderListItem = (data, index) => {
        return (
            <View style={styles.item} key={index}>
                {/*<Text style={[styles.itemContent, data.success ? {} : styles.itemContentRed]}>{data.content}</Text>*/}
                <Text style={[styles.itemContent]}>{data.text}</Text>
                <Text style={styles.date}>{data.time}</Text>
            </View>
        );
    }
    render() {
        const { netInfo, data } = this.props;
        const { isLoaded } = this.state;
        const isConnected = netInfo.isConnected;
        const { messageList, hasMessageCache } = data;
        return (
            <View>
                {
                    isLoaded
                    ? <View>
                        {
                            (isConnected || (!isConnected && hasMessageCache)) // 有网 或者 没网但是有缓存
                            ? <View>
                                {
                                    messageList.length
                                    ? <ScrollView>
                                        <View style={styles.container}>
                                            {
                                                messageList.map((data, index) => this._renderListItem(data, index))
                                            }
                                        </View>
                                    </ScrollView>
                                    : <View style={styles.noRecordPage}>
                                        <Image style={styles.noRecordImg} source={require('../../assets/images/my/no_record.png')}/>
                                        <Text style={styles.noRecordTxt}>{I18n.t('my.noRecord')}</Text>
                                    </View>
                                }
                            </View>
                            : <NoNetworkPage tryAgainFunc={this._init}/>
                        }

                    </View>
                    : <Spinner/>
                }
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
            </View>
        );
    }
}

export default connect(
    state => ({
        netInfo: state.netInfo,
        data: state.data,
    }),{
        setMessageList,
    }
)(MessageCenter)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
        paddingTop: scaleSize(40),
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
        alignItems: 'center',
    },
    item: {
        // height: scaleSize(104),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#9B9B9B',
    },
    itemContent: {
        maxWidth: scaleSize(500),
        color: '#4A4A4A',
        fontSize: scaleSize(28),
        marginTop: scaleSize(32),
        marginBottom: scaleSize(32),
    },
    itemContentRed: {
        color: '#D0021B'
    },
    date: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
        marginTop: scaleSize(4),
    },
    noRecordPage: {
        width: scaleSize(750),
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    noRecordImg: {
        width: scaleSize(120),
        height: scaleSize(160),
        marginBottom: scaleSize(20),
        marginTop: Dimensions.get('window').height / 2 - scaleSize(88) - scaleSize(220)
    },
    noRecordTxt: {
        color: '#E8E8E8',
        fontSize: scaleSize(28),
    },
});