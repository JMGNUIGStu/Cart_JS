const Randomise = require('./Randomise.js').Randomise
var x

module.exports = {
    getTrainArray: function(array){
        x = Math.ceil(2*(array.length/3))
        //Takes 1st two-thirds of randomised array to use for training
        trainArray = array.slice(0,x);
        return trainArray;
    },

    getTestArray: function(array){
        x = Math.ceil(2*(array.length/3))
        //Takes last one-third of randomised array to use for testing
        testArray = array.slice(x, array.length);
        return testArray;
    }
}
