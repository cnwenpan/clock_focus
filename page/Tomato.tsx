import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import moment from "moment";

let timer;

export default class Tomato extends React.Component {


    state = {
        timeText: 1620491400000,
        tip:''
    }

    componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        timer = setInterval(() => {
            const {timeText,tip} = this.state;
            if(timeText<=1620489600000){
                this.setState({
                    timeText:1620490200000,
                    tip:tip==='休息'?'':'休息'
                })
            }
            this.setState({
                timeText:timeText-1000
            })
        }, 1000)
    }

    render() {
        const {timeText,tip} = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.time}>{moment(timeText).format('mm:ss')}</Text>
                <Text style={{color:'#ffffff'}}>{tip}</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1C1C',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    time:{
        color: '#ffffff',
        fontSize: 128,
        textAlign: 'center',
    }
})
