
import React, {Component} from 'react';

export default itemsList = {
    __itemsSelected: [], // stays private
    get getItems() {
        return this.__itemsSelected
    },
    addItem(item) {
        this.__itemsSelected.push(item)
    },
    set setItemsSelected(list) {
        this.__itemsSelected = list //[...list]
    }
}

// can this be implemented as react class component without render or JSX
