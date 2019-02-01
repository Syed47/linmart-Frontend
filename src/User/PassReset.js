import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        FlatList,
        ScrollView, 
        ImageBackground, 
        TouchableOpacity,
        Keyboard } from 'react-native';

class PassReset extends React.Component {

	constructor() {
		super();
		this.state = {}
	}

	render() {

		alert(JSON.stringify(this.state.userinfo))

		return (
			<View style = {styles.main}> 

			</View>
		)
	}
}


const styles = StyleSheet.create({

	main: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1%',
        // backgroundColor: 'grey',

        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,

	}

});

export default PassReset;