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
        }
        // this.itemsSelected = []
        //this data comes from MemberDetails & Checkout, depending on where the component renders
        this.item = { 
            itemName: this.props.itemName, 
            itemPrice: this.props.itemPrice, 
            area: this.props.area
        }
    }
    
    // accessible from MemberDetails Component
    addToBasket() {
        items.addItem(this.item)
        this.setState({checked: true}) 
    }
    // accessible from MemberDetails Component
    cancelAddToBasket() {
        items.setItemsSelected = [...items.getItems].filter(i => i.itemName !== this.item.itemName) 
        this.setState({checked: false})
    }
    // accessible from Checkout Component
    throughBackFromTheBasket() { 
        /*Do not replace 'this.props.itemName by this.item.itemName, even though there are the same'*/
        items.setItemsSelected = items.getItems.filter(i => i.itemName !== this.props.itemName)
        this.props.refresh()
        // alert(JSON.stringify(items.getItems.map(item => item.itemName))+this.item.itemName+items.getItems.length)
    }
    // can only be seen in Checkout Component
    crossBox() {
        return(
            <TouchableOpacity style = {{borderColor: 'red'}} 
                onPress = {()=> this.throughBackFromTheBasket()}>
                <Image source = {cross}/>
            </TouchableOpacity>
        );  
    } 
    // can only be seen in MemberDetails Component
    checkbox(){
        // checked -> is controlled from inside this function to change images
        if (this.state.checked) { 
            return(
                <TouchableOpacity style = {{borderColor: 'red'}} 
                    onPress = {()=> this.cancelAddToBasket()}>
                    <Image source = {selected}/>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity  style = {{borderßColor: 'red'}} 
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