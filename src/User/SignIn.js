import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import street from '../Images/street.jpg';
import cart from '../Images/cart.jpg';
import logo from '../Images/logo.jpg';

class SignIn extends React.Component{

    constructor(){
        super();
        this.state = {
            phone: 'Default',
        }
    }

    signIn(){
        fetch('http://192.168.0.11:3000/signin', {
            method: 'POST', 
            body: JSON.stringify({phone : this.state.phone}), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            data.isValid ? this.props.navigation.navigate('Home') : alert('Try Again!')
        }).catch(err => alert(err));
    }


    render(){
        return(    
            <ImageBackground style={styles.main} source={cart}>
            
                <View style={styles.logo}>
                    <Text style={{
                        fontSize: 60,
                        color: 'rgba(249, 129, 37, 1)'}}>
                        linmart
                    </Text>
                </View>

                <View style={styles.textinput_wrapper}>
                    <TextInput
                        style={styles.txtfield}
                        placeholder="         Phone"
                        placeholderTextColor="white"
                        onChangeText={ phone => this.setState({ phone })}
                    />
                </View>

                <View style={styles.button_wrapper}>

                    <TouchableOpacity style={styles.touchableopacity}>
                        <Text style={styles.buttontext}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableopacity}
                        onPress = { () => {
                            this.signIn()
                            //this.state.phone === 'password' ?this.props.navigation.navigate('Home') : alert('Try Again!')
                        } }>
                        <Text style={styles.buttontext}>SignIn</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxHeight: '100%',
        minWidth: '100%',
        paddingVertical: '5%',
    },

    logo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,
        width: '100%',
        padding: '2%',
        marginVertical: '2%',
        
    },

    textinput_wrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        padding: '1%',
        marginVertical: '2%',
        
    },
    txtfield:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 44,
        color: 'white',
        minWidth: '90%',
        maxWidth: '90%',
        color: "white",
        fontStyle: 'italic',

    },
    button_wrapper:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        padding: '1%',
        marginVertical: '1%',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,
        
    },
    touchableopacity:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(249, 129, 37, 1)',
        borderRadius: 10,
        marginVertical: '1%',  
        marginHorizontal: '8%',       
    },
    buttontext:{
        color: 'white',//'rgba(249, 129, 37, 1)',
        fontSize: 32,
    }
});

export default withNavigation(SignIn);
