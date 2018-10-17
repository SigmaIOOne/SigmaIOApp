import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Assets from './asset';
import Guide from '../../guide/guide';

class AssetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
    }
    // componentDidMount() {
        // storage.load({ key: 'walletInfo'})
        //     .then((res) => {
        //         // console.log('$$$ ', res);
        //         if(res.logged) {
        //             this.setState({
        //                 logged: true
        //             });
        //         }
        //         // this.setState({
        //         //     logged: true
        //         // })
        //     })
        //     .catch(() => {
        //         this.setState({
        //             logged: false
        //         })
        //     });
    // }

    componentWillMount() {
        console.log('will ', this.props.wallet);
        this._changeLoginState(this.props.wallet.login);
    }

    componentWillReceiveProps(nextProps) {
        const newLoginState = nextProps.wallet.login;
        if (this.props.wallet.login !== newLoginState) {
            this._changeLoginState(newLoginState);
        }
    }

    _changeLoginState = (newState) => {
        this.setState({
            login: newState
        });
    }

    render() {
        return (
            <View style={styles.container}>
                { !!this.state.login
                    ? <Assets navigation={this.props.navigation}/>
                    : <Guide navigation={this.props.navigation}/>
                }
            </View>
        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(AssetHome)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});