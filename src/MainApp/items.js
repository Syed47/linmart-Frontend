
import React, {Component} from 'react';

export default itemsList = {
    itemsSelected: [],
    get getItems() {
        return this.itemsSelected
    },
    set addItem(item) {
        this.itemsSelected.push(item)
    },
    set setItemsSelected(list) {
        this.itemsSelected = [...list]
    }
}

// can this be implemented as react class component without render or JSX
