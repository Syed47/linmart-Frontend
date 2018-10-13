
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

// class itemsList {
//     constructor(props) {
//         super(props)
//         this.state = {
//             itemsSelected: []
//         }
//     }
//     get getItems() {
//         this.state.itemsSelected
//     }
//     set setItemsSelected(list) {
//         this.setState({
//             itemsSelected: [...list]
//         })
//     }
// }