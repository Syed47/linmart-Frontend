
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

// store the data of current user
// the data has links to the DB
const user_data_from_server = {
    userid: 22
} 


// @value: is the text need to be check against a pattern
// @pattern: it must be regex expression, inclosed inside two forward slashes: /regex/
// @err: user defined custom error message : default value is provided too
function match(value, pattern, err = 'Invalid String') {    
    try {
        let data = pattern.exec(value); // -> Object
        /*
            the return value can also be treated as a boolean,
            i.e length > 0 = true, length == 0 = false
        */
        return (data && data[0] === data['input']) ? data[0] : null
    } catch(err) {
        throw new Error(err)
    }
}


// Deprecated ALGO
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


// String hashing algorithm 
// Collision probability of 1 : 2 ** 32
// @param: string -> primitive String
// @return: output -> primitive String  
const hashString = function(string) {
    
    let hash = 0,
        chr, 
        strlen = string.length, 
        keylen = 0
        output = '';

    if (!strlen) return undefined; // if : strlen === 0
    
    for (let i = 0; i < strlen; i++) {
        chr   = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit Integer
    }

    hash *= hash < 0 ? -1 : 1; // Convert -hash into +hash

    const key = String(hash) // Convert key:Int32 into String
    keylen = key.length;

    for (let i = 0; i < keylen; i++) {
        output += !(i % 2) ? String.fromCharCode(Number(key[i]) + 99) : key[i]
    }

    return output;
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

// Implementation of Binary Search algorithm
// finds the leftmost occurence
function bs_leftmost(arr, x) {

    let low = 0, high = arr.length - 1;
    let mid;
    x = x.charCodeAt(0)
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (x === arr[mid].charCodeAt(0)) {
            high = mid - 1;
        } else if (x < arr[mid].charCodeAt(0)) {
            high = mid - 1;
        } else {
            low = mid + 1;
        } 
    }
    return arr.slice(mid);
}

module.exports = {
    itemStore, 
    match,
    crypto,
    hashString, 
    binary_search,
    bs_leftmost,
    user_data_from_server
}