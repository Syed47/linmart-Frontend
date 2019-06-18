import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        FlatList,
        Image,
        ScrollView, 
        ImageBackground, 
        TouchableOpacity,
        Keyboard } from 'react-native';

class Profile extends React.Component {

	constructor() {
		super();
		this.state = {
			text: 'Profile',
			userinfo: []
		}

		this.fetchData();
	}

	fetchData() {
		fetch('http://172.20.10.2:4000/userinfo')
			.then(res => res.json())
			.then(data => {
				this.setState({ userinfo: data })
				alert(JSON.stringify(this.state.userinfo))
			})
			.catch(err => alert(err))
	}

	render() {

		alert(JSON.stringify(this.state.userinfo))

		return (
			<View style = {styles.main}> 

				<View style = {styles.avator} > 
                    <Image source={require('../assets/icons/settings.png')}/>
                    <Text style = {{ fontSize: 22 }}> {'User Name'} </Text>
				</View>

				<View style = {styles.info_list} >
					<FlatList
	                    data={this.state.userinfo}
	                    renderItem = {
	                        ({item})=> {
	                        	return (<TouchableOpacity style = {{
	                //         				paddingVertical: '1%',
									        // paddingHorizontal: '2%',
									        borderWidth: 1, 
									        // borderColor: 'lime',
									        width: '100%'
									        }}> 
	                        				<Text style = {styles.info_item}> 
        		                        		{item.name}
        		                        	 </Text>
                        					<Text style = {styles.info_item}> 
        		                        		{item.email}
        		                        	 </Text>
 	                        				<Text style = {styles.info_item}> 
        		                        		{item.address}
        		                        	 </Text>
        		                         </TouchableOpacity>)
	                        }
	                    }
	                />
                </View>
			</View>
		)
	}
}


const styles = StyleSheet.create({

	main: {
		flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: '1%',
        width: '100%',
        // backgroundColor: 'grey',

        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 10,

	},

	avator: {
		flex: 1,
		// flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
		// margin: '1%',
		borderWidth: 1,
        borderColor: 'red',
        marginBottom: '2%'
        // borderRadius: 10,	
	},

	info_list: {
		flex: 3,
        // justifyContent: 'center',
        // alignItems: 'center',
		// padding: '1%',
        borderWidth: 1,
        borderColor: 'green',
        // borderRadius: 10,
	},

	info_item: {

		borderColor: 'grey',
		fontSize: 22,
		color: 'lime',
		        borderWidth: 1,
        borderColor: 'blue',
        // borderRadius: 10,
	}



});

export default Profile;