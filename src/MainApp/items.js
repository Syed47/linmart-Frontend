
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
