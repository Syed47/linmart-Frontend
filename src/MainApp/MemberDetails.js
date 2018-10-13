import React from 'react';
import { View, Text, StyleSheet, Image,FlatList,TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Card from './Card';
import ListItem from './ListItem';

// this.props.navigation.state.params.title

class MemberDetails extends React.Component {

    constructor(props) {
        super(props);
        this.passedDetails = this.props.navigation.state.params.info;
    }

    render(){

        return(
            <View style = {styles.main}>
                <View style = {styles.info_wrapper}>
                    <Card info = {this.passedDetails}/>
                </View>
                <View style = {styles.contact_wrapper}>
                    <Text style = {styles.number}>
                        {this.passedDetails.phone}
                    </Text>
                    <TouchableOpacity style={styles.buttonShape}
                        onPress={() => { alert(`Calling ${this.passedDetails.phone}`) }}>
                        <Image source = {require('./icons/phone.png')}/>
                    </TouchableOpacity>

                </View>
                <View style = {styles.menu_wrapper}>
                    <Text style = {styles.itemsForSale}>
                        Items Available
                    </Text>
                    <FlatList
                        data={this.passedDetails.menu}
                        renderItem = {
                            ({item})=> <ListItem  itemName = {item.name} 
                                            itemPrice = {item.price} 
                                            action = 'toTheBasket' 
                                            checkbox = {true}
                                            area = {this.passedDetails.area}/>
                        }
                    />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    info_wrapper:{
        flex:4,
        backgroundColor: 'white', //'rgba(209, 255, 180,1)',
        width: '100%',
    },
    contact_wrapper:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor:  'rgba(165, 185, 255, 0.95)',
        width: '100%',
        paddingHorizontal: '4%',
        paddingVertical: '3%'
    },
    menu_wrapper:{
        flex:9,
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonShape:{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 90,
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent: 'space-around',
        padding: '1%',
        margin: 1
    },
    number:{
        flex:3,
        fontSize: 24,
        color: 'white',
        paddingBottom: '1%'
    },
    itemsForSale:{
        paddingHorizontal: '4%',
        fontSize: 24,
        color: 'white',
        // borderBottomColor: 'purple',
        // borderBottomWidth: 1,
        backgroundColor: 'rgba(255, 114, 114,0.9)'
    }

});

export default withNavigation(MemberDetails);