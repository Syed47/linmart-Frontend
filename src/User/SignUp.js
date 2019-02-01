
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
import street from '../assets/street.jpg';
import cart from '../assets/cart.jpg';
import logo from '../assets/logo.jpg';
import { hashString, match } from '../components/util';


class SignUp extends React.Component {

	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			address: '',
			password: '',
			confirmPassword: '',
		}
	}

	signUp() {

		const { username, email, address, password, confirmPassword } = this.state;

        for (let key in this.state) {
            // check if any data is left blank
            if (!this.state[key]) {
                alert('Please fill the form.');
                return;
            }
        }

		if (confirmPassword !== password) {
			alert('Password does not match!')
			return;
		}

		const userData = {
			username: username,
			password: hashString(password),
			email: email,
			address: address
		}

        fetch('http://172.20.10.2:4000/signup', {
            method: 'POST', 
            body: JSON.stringify(userData), 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            if (data.msg === 'Successfull')
                this.props.navigation.navigate('SignIn')
            else
                alert('Unexpected Error!, Please try later!')
        }).catch(err => alert(err))

	}

	render() {
		return(
			<ImageBackground style = {styles.main} source = {cart}>

				<View style = {styles.logo_wrapper}>
					<Text style = {{
                        fontSize: 32,
                        color: 'rgba(249, 129, 37, 1)'}}>
						shop.it
					</Text>
				</View>

				<View  style = {styles.textinput_wrapper}>
					<TextInput
						style = {styles.txtfield}
						placeholder = {'Name'}
						onChangeText = {(username) => this.setState({username})}
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            if (match(this.state.username, /^[a-zA-Z0-9.\-_]{4,20}$/)) {
                                Keyboard.dismiss();
                                return;
                            }
                            alert(`Username must not contain symbols or spaces.\nEnter atleast a 4 letter username`)
                        }}
					/>
					<TextInput
						style = {styles.txtfield}
						placeholder = {'Email'}
						onChangeText = {(email) => this.setState({email})}
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            // look for a strict email regex
                            if (match(this.state.email, /[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|ac\.[a-z]{2})/)) {
                                Keyboard.dismiss();
                                return;
                            }
                            alert('Please Enter valid Email')
                        }}
					/>
						
					<TextInput
						style = {styles.txtfield}
						placeholder = {'Address'}
						onChangeText = {(address) => this.setState({address})}	
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            // might not need any regex as addresses can be infinite
                            if (match(this.state.address, /[A-Za-z0-9'\.\-\s\,]+/)) {
                                Keyboard.dismiss();
                                return;
                            }
                            alert('Address must not contain any symbols')
                        }}
					/>		
					<TextInput
						style = {styles.txtfield}
						placeholder = {'Password'}
                        secureTextEntry={true}
						onChangeText = {(password) => this.setState({password})}
                        returnKeyType="next"
                        onSubmitEditing = {() => {
                            if (match(this.state.password, /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[-_$@])[\w-_$@]{6,20}$/ )) {
                                Keyboard.dismiss();
                                return;
                            }
                            alert('Password must contain an Uppercase,\n Lowercase letter, Symbol and a number!')
                        }}
					/>	
					<TextInput
						style = {styles.txtfield}
						placeholder = {'Confirm Password'}
                        secureTextEntry={true}
						onChangeText = {(confirmPassword) => this.setState({ confirmPassword })}	
                        returnKeyType="done"
                        onSubmitEditing = {() => {
                            Keyboard.dismiss();
                        }}		
					/>			
				</View>

               	<View style={styles.button_wrapper}>

					<TouchableOpacity style={styles.touchableopacity}
						onPress = { () => this.signUp() }>
						<Text style={styles.buttontext}>SignUp</Text>
					</TouchableOpacity>
            	</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        maxHeight: '100%',
        minWidth: '100%',
        paddingVertical: '2%',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,
    },
	logo_wrapper: {
		flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: '4%',
        paddingVertical: '1%',
        width: '90%',

        // borderWidth: 1,
        // borderColor: 'blue',
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
        fontSize: 18,
        color: 'white',
        minWidth: '90%',
        maxWidth: '90%',
        color: 'rgba(249, 129, 37, 1)',
        fontStyle: 'italic',
        marginVertical: '2%',
        paddingHorizontal: '2%',
        // borderWidth: 1,
        // borderColor: 'rgba(249, 129, 37, 1)',
        borderRadius: 10,
        backgroundColor: 'white'//'rgba(249, 129, 37, 1)'
    },
    button_wrapper:{ // component # 3
        flex: 2,
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
        marginHorizontal: '6%',       
    },
    buttontext:{
    	padding: '1%',
        color: 'white',//'rgba(249, 129, 37, 1)',
        fontSize: 28,
    }

})

export default withNavigation(SignUp);
