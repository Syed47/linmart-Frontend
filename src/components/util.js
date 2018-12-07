
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
        return (data && data[0] === data['input']) ? data[0] : false;
    } catch(err) {
        // do something about the error
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
            //((msg[i]-'0')^(key[i]-'0')+'0') // find out on stackoverflow what does it do
            // XorAscii = string.charCodeAt(i) ^ (key.charCodeAt(i))
            XorAscii = (string.charCodeAt(i)-'0') ^ (key.charCodeAt(i)-'0')+'0'
            // console.log(XorAscii) 
            vernomChar = String.fromCharCode(XorAscii)
            // console.log(vernomChar)
            output += vernomChar
        }
        return output
    },

    encrypt: function(string) {
        return this.__HASH__.call(this, string, this.key)
    },

    decrypt: function(string) {
        return this.__HASH__.call(this,string, this.key)
    }
}

module.exports = {itemStore, match,crypto, user_data_from_server}