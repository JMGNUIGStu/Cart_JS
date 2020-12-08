const decisionTree = require('./utils/DecisionTree')
const parser = require('./utils/ParseCSV')
const splitFiles = require('./utils/SplitFile')
const Randomise = require('./utils/Randomise')
const fs = require('fs')

// Initally completed by Jack, improved structure and flow by Meadhbh as Jack solution was incomplete/incorrect in places

function main()
{
    // Import data from CSV and build tree
    const inputData = "./beer.csv"
    const data = parser.loadCSVData(inputData)
    const random = Randomise.Randomise(data)
    const trainArray = splitFiles.getTrainArray(random)
    const testArray = splitFiles.getTestArray(random)
    const tree = decisionTree.treeBuilder(trainArray, [])
    const predictions = decisionTree.fit(trainArray, tree, trainArray)

    // Cycle through data and predictions
    testArray.forEach(function(item, index, array)
    {
        let currentPrediction = ""
        let size = 0
        for (key in predictions[index])
        {
            if (predictions[index].hasOwnProperty(key))
            {
                size += predictions[index][key]
            }
        }
        for (key in predictions[index])
        {
            if (predictions[index].hasOwnProperty(key))
            {
                const probability = ((predictions[index][key]/size)*100).toFixed(2)
                currentPrediction += key + "-" + probability
            }
        }
        console.log(item + "-" + currentPrediction)
    }
    )
}
main()
