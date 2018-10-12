import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Image } from 'react-native';
import select from './icons/select.png';
import selected from './icons/selected.png';
import items from './items'

class ListItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
        this.itemsSelected = []
    }

    checkbox(){
        const {itemName, itemPrice } = this.props;
        const item = {itemName, itemPrice, area: this.props.metaData.area}

        if (this.state.checked) {
            return(
                <TouchableOpacity style = {{borderColor: 'red'}} 
                    onPress = {()=> {
                        this.itemsSelected = items.getItems.filter(i => i.itemName !== itemName )                      
                        items.setItemsSelected = this.itemsSelected
                        alert(JSON.stringify(items.getItems))
                        this.setState({checked: false})}
                    }>
                    <Image source = {selected}/>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity  style = {{borderColor: 'red'}} 
                onPress = {()=> {
                    items.addItem = item
                    // alert(JSON.stringify(items.itemsSelected)+ items.getItems.length)
                    this.setState({checked: true})}
                }>
                <Image source = {select}/>
            </TouchableOpacity>
        );
    }

    render(){

        return(
            <TouchableOpacity style = {styles.food_wrapper} >
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <View style={styles.foodname}>
                        <Text style = {{color: 'white',fontSize: 24}}>{this.props.itemName}</Text>
                    </View>
                    <View style={styles.foodprice}>
                        <Text style = {{color: 'white',fontSize: 22, paddingRight: 4}}>£: {this.props.itemPrice}</Text>
                        {this.props.checkbox ? this.checkbox()  : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    food_wrapper:{
        flex: 1,
        flexDirection :'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width: '100%',
        minHeight: 50,
        marginVertical: '1%',
        padding: '2%',
        backgroundColor: 'rgb(155,200,200)',

    },
    foodname:{
        flex: 2,
        flexDirection :'row',
    },
    foodprice:{
        flex: 1,
        flexDirection :'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
});

export default ListItem;