import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import ListItem from './ListItem';
import items from './items';

class CheckOut extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			items: [...items.getItems],
			totalPrice: 0
		}
		this.state.items.forEach(item => this.state.totalPrice += item.itemPrice );
		
	}
	
	renderItemsSelected = () => (this.state.items.map(item => { 
		return (			
			<ListItem itemName = {item.itemName} 
					itemPrice = {item.itemPrice}
					action = 'throughBack' 
					cross = {true}
					area = {item.area}/> 		
		)})
	)


	render(){

		const date = new Date().toString().substring(4,15);
		const time = new Date().toString().substring(15,24);

		return(
			<View style = {styles.main}>
				<View style = {styles.msgbox_wrapper}>
					<Text style = {{fontSize: 20, paddingHorizontal: '2%', color: 'purple'}}>
						Please confirm!
					</Text>
	                <TouchableOpacity style={styles.buttonShape}
                        onPress={() => { alert("Calling...") }}>
                        <Text style={{fontSize: 18,color: 'white'}}>Confirm</Text>
                        <Image source = {require('./icons/confirm.png')}/>
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
							£: {this.state.totalPrice.toString().substring(0,5)}
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
		paddingTop: '4%',
		paddingBottom: '2%',
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
        marginLeft: '2%'
    },
    text:{
    	flex: 1,
    	fontSize: 22,
    },
});


export default withNavigation(CheckOut);
