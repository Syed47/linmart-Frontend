
// store the data of current user
// the data has links to the DB
const user_data_from_server = {
    userid: 45
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


//* Deprecated * need Improvement 
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

    if (!strlen) throw TypeError('Input cannot be null')
    if (!(typeof string === 'string'))  
        throw TypeError('Input must be a string value'); 
    
    for (let i = 0; i < strlen; i++) {
        chr   = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit Integer
    }
    // Custom modification to the hash value
    hash *= hash < 0 ? -1 : 1; // Converts -hash into +hash

    const key = String(hash) // Converts key:Int32 into String
    keylen = key.length;

    for (let i = 0; i < keylen; i++) {
        output += !(i % 2) ? 
                    String.fromCharCode(Number(key[i]) + 99) : 
                    key[i]
    }

    return output;
}


// Implementation of Binary Search algorithm
// finds the leftmost occurence
function bs_leftmost(arr, x) {

    if (typeof x !== 'string' || !arr.length || !x.length)
        return 'Invalid arguments'

    let low = 0, high = arr.length - 1, mid;
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
    match,
    crypto,
    hashString, 
    bs_leftmost,
    user_data_from_server
}