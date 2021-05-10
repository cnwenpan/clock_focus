import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import moment from 'moment'


let timer;

export default class Clock extends React.Component {

    state = {
        timeText: new Date()
    }

    componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        timer = setInterval(() => {
            this.setState({
                timeText: new Date()
            })
        }, 1000)
    }

    render() {
        const {timeText} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.time}>{moment(timeText).format('HH:mm:ss')}</Text>
                <Text style={{color:'#ffffff'}}>{moment(new Date()).format('DD/MMM dddd')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1C1C',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    time: {
        color: '#ffffff',
        fontSize: 128,
        textAlign: 'center',
    },

});
