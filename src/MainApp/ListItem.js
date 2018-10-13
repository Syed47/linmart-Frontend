import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Image } from 'react-native';
import select from './icons/select.png';
import selected from './icons/selected.png';
import items from './items'
import cross from './icons/cross.png';

class ListItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            items: [...items.getItems]
        }
        this.itemsSelected = []
        this.item = {
            itemName: this.props.itemName, 
            itemPrice: this.props.itemPrice, 
            area: this.props.area
        }
    }

    addToBasket() {
        items.addItem = this.item
        this.setState({checked: true})
    }
    cancelAddToBasket() {
        this.itemsSelected = [...items.getItems].filter(i => i.itemName !== this.item.itemName)                      
        items.setItemsSelected = this.itemsSelected
        this.setState({checked: false})
    }
    throughBackFromTheBasket() {
        this.itemsSelected = this.state.items.filter(i => i.itemName !== this.item.itemName)                      
        items.setItemsSelected = this.itemsSelected
        this.setState({
            items: this.itemsSelected
        })
    }

    crossBox() {
        return(
            <TouchableOpacity style = {{borderColor: 'red'}} 
                onPress = {()=> this.throughBackFromTheBasket()}>
                <Image source = {cross}/>
            </TouchableOpacity>
        );  
    } 

    checkbox(){

        if (this.state.checked) {
            return(
                <TouchableOpacity style = {{borderColor: 'red'}} 
                    onPress = {()=> this.cancelAddToBasket()}>
                    <Image source = {selected}/>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity  style = {{borderColor: 'red'}} 
                onPress = {()=> this.addToBasket()}>
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
                        {this.props.cross ? this.crossBox()  : null}
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