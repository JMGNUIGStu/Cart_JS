const Parse = require('./Parse.js').Parse
const Randomise = require('./Randomise.js').Randomise
var x

module.exports = {
    getTrainArray: function(filename){
        let trainArray = Array()
        //Parses file into Array
        dataArray = Parse.loadCSVData(filename);
        //Randomises Array
        dataArray = Randomise.randomiseArray(dataArray);
        x = Math.ceil(2*(dataArray.length/3))
        //Takes 1st two-thirds of randomised array to use for training
        trainArray = dataArray.slice(0,x);
        return trainArray;
    },

    getTestArray: function(filename){
        let testArray = Array()
        dataArray = Parse.loadCSVData(filename);
        dataArray = Randomise.randomiseArray(dataArray);
        x = Math.ceil(2*(dataArray.length/3))
        //Takes last one-third of randomised array to use for testing
        testArray = dataArray.slice(x, dataArray.length);
        return testArray;
    }
}
