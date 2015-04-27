/**
 * Array utilities
 */

import {Str} from './string';

var Arr = {
    has: function(arr, val, caseSensitive){
        var sCase = caseSensitive===undefined ? false : caseSensitive;
        for (var i=0; i<arr.length; i++){
            if(Str.matchCase(arr[i].toString(), sCase) == val){
                return true;
            }
        }
        return false;
    },
    indexByValue: function(arr, val, caseSensitive){
        var sCase = caseSensitive===undefined ? false : caseSensitive;
        for (var i=0; i<arr.length; i++){
            if(Str.matchCase(arr[i].toString(), sCase) == val){
                return i;
            }
        }
        return -1;
    }
};

exports.Arr = Arr;
