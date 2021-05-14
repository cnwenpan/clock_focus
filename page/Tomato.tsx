import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import moment from "moment";
import {TimeShow} from "../components/TimeShow";

let timer:any

export default class Tomato extends React.Component {


    state = {
        timeText: 1620491400000,
        tip:'集中注意力！',
        rest:false
    }

    componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        timer = setInterval(() => {
            const {timeText,rest} = this.state;
            if(timeText<=1620489600000&&!rest){
                this.setState({
                    timeText:1620490200000,
                    rest:true,
                    tip:'休息一下吧~'
                })
            }else if(timeText<=1620489600000&&rest){
                this.setState({
                    timeText:1620491400000,
                    rest:false,
                    tip:'集中注意力！'
                })
            }else{
                this.setState({
                    timeText:timeText-1000
                })
            }

        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    render() {
        const {timeText,tip} = this.state;
        return (
            <View style={styles.container}>
                <TimeShow value={moment(timeText).format('mm:ss')} />
                <Text style={{color:'#ffffff',fontSize:20}}>{tip}</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex:10,
    },
    time:{
        color: '#ffffff',
        fontSize: 128,
        textAlign: 'center',
        fontWeight:'bold'
    }
})
