
// import React, {Component} from 'react';

const items  = {
    __itemsSelected: [], // stays private
    get getItems() {
        return this.__itemsSelected
    },
    addItem(item) {
        this.__itemsSelected.push(item)
    },
    set setItemsSelected(list) {
        this.__itemsSelected = [...list]
    }
}

module.exports = {items}