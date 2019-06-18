import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput, 
        ImageBackground, 
        TouchableOpacity,
        Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import street from '../assets/street.jpg';
import cart from '../assets/cart.jpg';
import logo from '../assets/logo.jpg';
import { match, 
        hashString,
        user_data_from_server } from '../utils/util';

// to access native keys: event.nativeEvent.key

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.navigate = this.props.navigation.navigate;
    }

    signIn() {
        
        fetch('http://172.20.10.2:4000/signin', {
            method: 'POST', 
            body: JSON.stringify({
                username: this.state.username,
                password: hashString(this.state.password)
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {

            if (data.isValid) {
                this.navigate('Home')
                user_data_from_server.userid = data.userid || 45; // 45 : test data
                // Reset Username & Password to undefined
                this.setState({ username: '', password: '' }) 
                
            } else if (!data.isValid) {
                alert('Try Again!\n Invalid username or password')
            }
            // data.isValid ? this.navigate('Home') : alert('Try Again!,\n Invalid Username or Password')
        }).catch(err => alert(err))
    }


    render(){
        return(    
            <ImageBackground style={styles.main} source={cart}>
                
                <View style={styles.logo}>
                    <Text style={{
                        fontSize: 54,
                        color: 'rgba(249, 129, 37, 1)'}}>
                        shop.it
                    </Text>
                </View>

                <View style={styles.textinput_wrapper}>
                    <TextInput
                        style={styles.txtfield}
                        placeholder="Username"
                        defaultValue = {this.state.username}
                        onChangeText={ username => this.setState({ username }) }
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            Keyboard.dismiss();
                            //Only checks for white spaces: not char such as &^%<>?
                            if (this.state.username.length < 4) {
                                alert('Username must be atleast 4 characters')
                            } else if (!match(this.state.username, /^[a-zA-Z0-9.\-_]{4,20}$/)) {
                                alert('Invalid characters in username')
                            }                             
                        }}
                    />

                   <TextInput
                        style={styles.txtfield}
                        placeholder="Password"
                        defaultValue = {this.state.password}
                        secureTextEntry={true}
                        onChangeText={ password =>  this.setState({ password }) }
                        returnKeyType="done"
                        onSubmitEditing = {() => {
                            Keyboard.dismiss();                            
                            if (this.state.password.length < 6) {
                                alert('Password must be atleast 6 characters')
                            } else if (match(this.state.password, /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[-_$@])[\w-_$@]{6,20}$/)) {
                                this.signIn(); 
                            } else {
                                alert('Password must contain letter, symbol and a number ')
                            }
                        }}
                    />
                </View>

                <View style={styles.button_wrapper}>

                    <TouchableOpacity onPress = { ()=> this.navigate('SignUp') }>
                        <Text style = {styles.labeltext}> 
                           Signup
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = { ()=> this.navigate('PassReset') }>
                        <Text style = {styles.labeltext}>
                            Forgot password!
                        </Text>
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
        paddingVertical: '2%',
    },

    logo:{ // component # 1
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1%',
        marginVertical: '2%',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,
    },

    textinput_wrapper:{ // component # 2
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        padding: '1%',
        marginVertical: '2%',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,
    },
    txtfield:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        color: 'white',
        minWidth: '90%',
        maxWidth: '90%',
        color: 'rgba(249, 129, 37, 1)',
        fontStyle: 'italic',
        marginVertical: '7%',
        paddingHorizontal: '2%',
        // borderWidth: 1,
        // borderColor: 'rgba(249, 129, 37, 1)',
        borderRadius: 10,
        backgroundColor: 'white'//'rgba(249, 129, 37, 1)'
    },
    button_wrapper:{ // component # 3
        flex: 3,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '20%',
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
        fontSize: 28,
    },
    labeltext: {
        color: 'rgba(249, 129, 37, 1)',
        fontSize: 16,
        fontStyle: 'italic',
        margin: '1%'
    }
});

export default withNavigation(SignIn);
