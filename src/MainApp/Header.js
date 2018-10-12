import React from 'react';
import { View, Text, StyleSheet, TextInput,Image,TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import SettingsIcon from './icons/settings.png';

class Header extends React.Component {

    constructor(){
        super();
        this.state = {
            location: "default location value"
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <TextInput
                    style={styles.textfield}
                    placeholder = 'Location'
                    onChangeText={(location)=> {this.setState({location})}}/>

                <TouchableOpacity style= {styles.settings}
                    onPress = {()=> {this.props.navigation.navigate('CheckOut')}}
                >
                    <Image style = {styles.image} 
                        source={require('./icons/basket.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',        
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,
        maxHeight: 55
    },
    textfield:{
        flex: 7,    
        marginHorizontal: 5,
        color: "black",
        fontStyle: 'italic',
        fontSize: 18,
    },
    settings:{
        flex: 1,
    },
    image:{
        width: 40,
        height: 40,
    }
});


export default withNavigation(Header);
