import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import ListItem from './ListItem';
import itemStore from './stores/ItemStore.js';
import { user_data_from_server } from '../utils/util';

class CheckOut extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			items: itemStore.getItems,
			totalPrice: itemStore.getItems.reduce((total, item) => total += item.itemprice, 0)
		}		
	}

	// re-rendering after removing or adding item
	refresh() {
		this.setState({
			items: itemStore.getItems,
			totalPrice: itemStore.getItems.reduce((total, item) => total += item.itemprice, 0)
		})
	}

	renderItemsSelected() {
		return(this.state.items.map(item => {
			return(<ListItem membername = {item.membername}
							itemname = {item.itemname} 
							itemprice = {item.itemprice}
							cross = {true}
							area = {item.area}
							refresh = {this.refresh.bind(this)}/> 	
			)}
		))
	}

	async checkOutItems() {
		const items = this.state.items;
		// alert(JSON.stringify(items))
		const userid = user_data_from_server.userid;

		const request = await fetch('http://172.20.10.2:4000/checkout', {
	        method: 'POST', 
	        body: JSON.stringify({items: items, userid: userid}),
	        headers:{'Content-Type': 'application/json'}
	    });
	    
	    // check to see if the request is sent
	    if(request.ok){
	    	const data = await request.json()
	    	if (data.response) {
	    		this.setState({ items: [], totalPrice: 0 }, function() {
	    			alert(itemStore.flush() ? 'Done!' : 'Sorry try again!');	
	    		})
	    	}
	    }

	}

	render(){

		const date = new Date().toString().substring(4,15);
		const time = new Date().toString().substring(15,21);

		return(
			<View style = {styles.main}>
				<View style = {styles.msgbox_wrapper}>
					<Text style = {{
						fontSize: 24, 
						paddingHorizontal: '2%', 
						color: 'purple',
						// borderWidth: 1,
						// borderColor: 'red',
					}}>
						Almost done!
					</Text>
	                <TouchableOpacity style={styles.buttonShape}
                        onPress={async () => { 
								this.checkOutItems()
                         }}>
                        <Text style={{
                        	fontSize: 18,
                        	color: 'purple',
                        }}>Checkout</Text>
                        <Image source = {require('../assets/icons/trolley.png')}/>
	                </TouchableOpacity>
				</View>
				
				<View style = {styles.summery_wrapper}>
					<View style = {styles.reciept}>
						<Text style = {{fontSize: 30, color: 'white'}}>Receipt</Text>
					</View>
					<View style = {styles.summery_item}>
						<Text style = {styles.variable}>Items Bought: </Text>
						<Text style = {styles.value}>{this.state.items.length}</Text>	
					</View>
					<View style = {styles.summery_item}>
						<Text style = {styles.variable}>Time Bought: </Text>
						<Text style = {styles.value}>{`${time} ${date}`}</Text>
					</View>
					<View style = {styles.summery_item}>
						<Text style = {styles.variable}>Deliver By: </Text>
						<Text style = {styles.value}>{`${time} ${date}`}</Text>
					</View>
					<View style = {styles.summery_item}>
						<Text style = {styles.variable}>Total:</Text>
						<Text style = {styles.value}>
							£ {this.state.totalPrice.toString().substring(0,5)}
						</Text>
					</View>
				</View>
				<View style = {styles.listOfItems_wrapper}>
					<View style = {{borderBottomWidth: 1,borderBottomColor: 'rgba(165, 185, 255, 0.95)', paddingVertical: '1%'}}>
						<Text style = {{fontSize: 30, paddingLeft : '2%', color: 'white'}}>Items Selected</Text>
					</View>
	                <ScrollView>
						{this.renderItemsSelected()}
					</ScrollView>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	main:{
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		// padding: '1%'
		// borderColor: 'red',
		// borderRadius: 10,
		// borderWidth: 1
	},
	msgbox_wrapper:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minHeight: '5%',
		// paddingTop: '4%',
		// paddingBottom: '1.5%',
		// paddingVertical: '4%',
		paddingHorizontal: '1%',
		// margin: '1%',
		borderWidth: 1,
		borderColor: 'rgba(165, 185, 255, 0.95)',
		backgroundColor: 'rgba(165, 185, 255, 0.95)'
	},
	summery_wrapper:{
		flex: 5,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(255, 114, 114,0.9)',
		paddingHorizontal: '2%'
		// 		borderColor: 'red',
		// borderRadius: 10,
		// borderWidth: 1
	},
    summery_item:{
    	flex: 1,
        flexDirection :'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: '100%',//Dimensions.get('window').width,//'100%',
        borderBottomColor:'rgba(165, 185, 255, 0.95)',
        borderBottomWidth: 1,
  //       				borderColor: 'lime',
		// borderRadius: 10,
		// borderWidth: 1
    },
    reciept:{
    	flex: 2,
        borderBottomColor:'rgba(165, 185, 255, 0.95)',
        borderBottomWidth: 1,
        borderStyle:'dashed'
    },
    variable:{
    	// flex: 1,
    	fontSize: 20,
    	color: 'white',
  //   					borderColor: 'blue',
		// borderRadius: 10,
		// borderWidth: 1
    },
    value:{
    	// flex: 1,
    	fontSize: 20,
    	color: 'purple',
  //   					borderColor: 'blue',
		// borderRadius: 10,
		// borderWidth: 1
    },
	listOfItems_wrapper:{
		flex: 10,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		// 		borderColor: 'red',
		// borderRadius: 10,
		// borderWidth: 1,
		width: '100%',
		backgroundColor: 'rgba(255, 114, 114,0.9)'
	},
    listofitem:{
    	flex: 1,
        borderBottomColor:'rgba(165, 185, 255, 0.95)',
        borderBottomWidth: 1,
        borderStyle:'dashed'
    },    
    reciept:{
    	flex: 2,
        borderBottomColor:'rgba(165, 185, 255, 0.95)',
        borderBottomWidth: 1,
        borderStyle:'dashed'
    },
    buttonShape:{
    	flex: 1,
        flexDirection: 'row',
        borderRadius: 90,
        backgroundColor: 'rgba(100,255,0,0.75)',
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingVertical: '2%',
        marginLeft: '2%',
       //  							borderWidth: 1,
							// borderColor: 'red',
    },
    text:{
    	flex: 1,
    	fontSize: 22,
    },
});


export default withNavigation(CheckOut);
