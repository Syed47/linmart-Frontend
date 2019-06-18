
// this object work as bridge between Stack and Checkout screen
const itemStore  = {
    __itemsSelected: [], // stays private
    get getItems() {
        return this.__itemsSelected
    },
    addItem(item) {
        this.__itemsSelected.push(item)
    },
    set setItemsSelected(list) {
        this.__itemsSelected = [...list]
    },
    flush() {
        this.__itemsSelected.splice(0,this.__itemsSelected.length)
        if (!this.__itemsSelected.length) {
            return true;
        }
    }
}

module.exports = itemStore;
