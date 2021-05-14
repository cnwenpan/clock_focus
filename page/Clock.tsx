import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import moment from 'moment'
import {TimeShow} from "../components/TimeShow";


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
                <TimeShow value={moment(timeText).format('HH:mm:ss')} />
                <Text style={{color:'#ffffff',fontSize:20,fontWeight:'bold'}}>{moment(new Date()).format('DD-MMM dddd')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex:10,
    },
    time: {
        color: '#ffffff',
        fontSize: 128,
        textAlign: 'center',
    },

});
