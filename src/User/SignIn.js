import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { withNavigation } from 'react-navigation';
import street from '../Images/street.jpg';
import cart from '../Images/cart.jpg';
import logo from '../Images/logo.jpg';
import { match, crypto, user_data_from_server } from '../components/util';

// to access native keys: event.nativeEvent.key

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.navigate = this.props.navigation.navigate;
    }

    signIn(){
        /*
            @if both username and password are empty then the user can still signin.
            @need to fix this with regex
        */

        const ePassword = crypto.encrypt(this.state.password)

        // alert(ePassword)
        
        fetch('http://192.168.0.11:4000/signin', {
            method: 'POST', 
            body: JSON.stringify({
                username: this.state.username,
                password: ePassword
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            // this.setState({password: ''}) // this need to reset after each try -. not yet done! 
            return (res.json())
        })
        .then(data => {
            data.isValid ? this.navigate('Home') : alert('Try Again!'+ data.isValid)
            // alert(data.userid)
            user_data_from_server.userid = data.userid
            alert(user_data_from_server.userid)

        }).catch(err => alert(err))
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
                        placeholder="Username"
                        onChangeText={ username => this.setState({ username }) }
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            if (match(this.state.username, /[a-zA-Z0-9._-]+/)) {
                                Keyboard.dismiss();
                                return;
                            }
                            alert('Please Enter valid Username')
                        }}
                    />
                   <TextInput
                        style={styles.txtfield}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={ password =>  this.setState({ password }) }
                        returnKeyType="done"
                        onSubmitEditing = {() => {
                            if (match(this.state.password, /[a-zA-Z0-9£$._-]+/)) {
                                Keyboard.dismiss();
                                this.signIn()
                                return;
                            }
                            alert('Please Enter valid Password')                            
                        }}
                    />
                </View>

                <View style={styles.button_wrapper}>

                    <TouchableOpacity onPress = {()=> this.navigate('SignUp')}>
                        <Text style = {styles.labeltext}> Haven't yet signed-up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=> alert('Not yet ready!')}>
                        <Text style = {styles.labeltext}> Forgot password!</Text>
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
