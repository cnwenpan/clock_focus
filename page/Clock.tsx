import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment'
import {TimeShow} from "../components/TimeShow";


let timer: any;

export default class Clock extends React.Component {

    state = {
        initTime: new Date().getTime(),
        count: 0
    }

    componentDidMount() {

        timer = setInterval(() => {
            let {count} = this.state;
            this.setState({
                count: count + 1
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    render() {
        const {initTime, count} = this.state;
        return (
            <View style={styles.container}>
                <TimeShow value={moment(initTime + (count * 1000)).format('HH:mm:ss')}/>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{moment(initTime).format('DD-MMM dddd')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
    },
    time: {
        color: '#ffffff',
        fontSize: 128,
        textAlign: 'center',
    },

});
