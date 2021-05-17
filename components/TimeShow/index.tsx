import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export class TimeShow extends Component<any> {

    render() {
        const {value} = this.props;
        const values: Array<string> = value.split('');
        return (
            <View style={styles.timeContainer}>
                {values.map((item: string,index:number) => {
                    if (item === ':') {
                        return (
                            <View key={index} style={styles.colon}>
                                <View style={{height:120}}>
                                    <Text style={{color: '#ffffff', fontSize: 120,lineHeight:120}}>:</Text>
                                </View>
                            </View>
                        )
                    } else {
                        return <View key={index} style={styles.num}>
                            <View style={styles.grayBg} />
                            <Text style={styles.font}>{item}</Text>
                        </View>
                    }
                })}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    grayBg:{
        position:'absolute',
        width:70,
        height:120,
        backgroundColor: '#605e5e',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomEndRadius: 6,
        borderBottomLeftRadius: 6,
        opacity:0.8
    },
    num: {
        width: 70,
        height: 120,
        paddingLeft: 4,
        paddingRight: 4,
        textAlign: 'right',
        position:'relative',
        marginLeft: 5,
        marginRight:5,

    },
    colon: {
        width: 30,
        height: 130,
        lineHeight:120,
        textAlign: 'right',
        position: "relative"
    },

    font: {
        color: '#ffffff',
        fontSize: 100,
        fontWeight: 'bold',
        lineHeight:120,
    }
})

