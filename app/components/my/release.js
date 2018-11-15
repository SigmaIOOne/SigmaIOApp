import React from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { scaleSize } from '../../utils/ScreenUtil';

export default class Release extends React.Component {
    _renderRelease = (data, index) => {
        const content = data.content;
        return (
            <View style={styles.release} key={index}>
                <Text style={styles.releaseTitle}>{data.title}</Text>
                { !!content && !!content.length && content.map((res, index) => this._renderReleaseContent(res, index)) }
            </View>
        );
    }
    _renderReleaseContent = (data, index) => {
        return (
            <View style={styles.releaseContent} key={index}>
                <View style={styles.blackPoint}></View>
                <Text style={styles.releaseContentTxt}>{data}</Text>
            </View>
        );
    }
    render() {
        const list = [
            {
                title: '1.0.0 beta版上线',
                content: [
                    '暂无',
                ]
            }
        ];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        !!list.length && list.map((data, index) => this._renderRelease(data, index))
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: scaleSize(40),
        backgroundColor: '#FFFFFF',
        minHeight: Dimensions.get('window').height,
    },
    release: {
        marginBottom: scaleSize(40),
    },
    releaseTitle: {
        marginBottom: scaleSize(18),
        color: '#4A4A4A',
        fontSize: scaleSize(32),
    },
    releaseContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blackPoint: {
        width: scaleSize(8),
        height: scaleSize(8),
        borderRadius: scaleSize(4),
        backgroundColor: '#555555',
        marginRight: scaleSize(10),
    },
    releaseContentTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(28),
    }
});
