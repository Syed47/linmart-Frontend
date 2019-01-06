
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
        if (!this.__itemsSelected.length) return true
    }
}

// store the data of current user
// the data has links to the DB
const user_data_from_server = {
    userid: 22
} 

/*
    @value: is the text need to be check against a pattern
    @pattern: it must be regex expression, inclosed inside two forward slashes: /regex/
*/
function match(value, pattern) {    
    try {
        let data = pattern.exec(value);
        /*
            data returns an object where the first value is the 
            check to see if data is not null || undefined
            extracted string and data['input'] is the actual value

            the return value can also be treated as a boolean,i.e length > 0 = true, length  == 0 = false
        */
        return (data && data[0] === data['input']) ? data[0] : undefined
    } catch(err) {
        console.log(err)
    }

}


const crypto = {
    
    key: 'catchmeifyoucan', // vernom-cipher key
    // Private
    __HASH__: function(string, key) {
        const len = string.length
        let XorAscii = undefined;
        let vernomChar = undefined;
        let output = '';

        for (let i = 0; i < len; i++) {
            XorAscii = string.charCodeAt(i) ^ key.charCodeAt(i);
            if (XorAscii <= 32) {
                XorAscii += 32
            }
            vernomChar = String.fromCharCode(XorAscii) 
            output += vernomChar
        }
        return output
    },

    encrypt: function(string) {
        return this.__HASH__.call(this, string, this.key)
    },

    decrypt: function(string) {
        return this.__HASH__.call(this, string, this.key)
    }
}


// A binary search algorithm
// @arr: the list needed to be searched
// @node: value required to be searched in the @arr
function binary_search(arr, node) {
    console.log(arr)
    let l = 0;
    let r = arr.length - 1

    while (l <= r) {
        let m = Math.floor((l + r) / 2)
        if (arr[m] < node) {
            l = m + 1
        } else if (arr[m] > node) {
            r = m - 1
        } else {
            return m
        }
    }
    return 'not found'
}

module.exports = {
    itemStore, 
    match,
    crypto, 
    binary_search,
    user_data_from_server
}