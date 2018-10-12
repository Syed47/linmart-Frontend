import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class SearchFilter extends React.Component{

    render(){
        return (
            <View style={styles.main}>
                <View style={styles.wrapper}>

                    <TouchableOpacity style={styles.buttonShape}
                        onPress={() => { alert("you clicked me") }}>
                        <Text style={styles.text}>Super-Stores</Text>
                        <Image source={require('./icons/supermarket.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonShape}
                        onPress={() => { alert("you clicked me") }}>
                        <Text style={styles.text}>Resturants</Text>
                        <Image source={require('./icons/resturant.png')} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(165, 185, 255, 0.95)', //'rgba(252, 128, 128,0.8)',
        maxHeight: 55,
        padding: 2,
    },
    wrapper:{
        flex: 1,    
        flexDirection: 'row',
    },
    buttonShape:{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 360,
        backgroundColor: 'rgba(255, 114, 114,0.9)',//'rgba(255, 50, 200, 0.5)
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginHorizontal: 3,
    },
    text:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 5
    }
});


export default withNavigation(SearchFilter);
