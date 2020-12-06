const decisionTree = require('./utils/DecisionTree')
const parser = require('./utils/parseCSV')
const fs = require('fs')

function main()
{
    // Import data from CSV and build tree
    const inputData = "./beer.csv"
    const data = parser.loadCSVData(inputData)
    const tree = decisionTree.treeBuilder(data, [])
    const predictions = decisionTree.fit(tree, data)

    // Cycle through data and predictions
    data.forEach(function(item, index, array)
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