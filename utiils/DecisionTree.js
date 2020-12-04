const Question=require('./Questions.js').Questions
const DecisionNode = require('./DecisionNode.js').DecisionNode
const LeafNode = require('./LeafNode.js').LeafNode


// Return predictions
function fit(tree, data) 
{
    let predictions = []
    data.forEach(function(sample, index, array) 
    {
        predictions.push(classifier(sample, tree))
    })
    return predictions
}

// Identifies question with highest information gain and returns it
function getSplit(data, attributes)
{
    let informationGain = 0
    let questionToAsk = undefined //Just until we get a better question
    const featuresCount = data[0].length-1

    for(let featureNumber=0; featureNumber < featuresCount; featureNumber++) 
    {
        if (!attributes.includes(featureNumber))
        {
            break
        }
        data.forEach(function(sample, index, array)
        {
            const tempQuestion = new Question(sample[featureNumber], featureNumber)
            const tempInfoGain = informationGain(data, tempQuestion)
            if (tempInfoGain > informationGain)
            {
                informationGain = tempInfoGain
                questionToAsk = tempQuestion
            }
        }
        )
    }
    return questionToAsk
}

//Calculates the information gain for a passed question
function informationGain(data, questionToAsk)
    const splitData = splitData(data, questionToAsk)
    const splitLeft = splitData.left
    const splitRight = splitData.right
    const informationGain = entropy(data) - (entropy(splitLeft)-entropy(splitRight))
    return parseFloat(informationGain.toFixed(2))
}

// Left = False, Right = True
function splitData(data, questionToAsk)
{
    let splitData=
    {
        left:[],
        right:[]
    }
    data.forEach(function(item, index, array)
    {
        if (questionToAsk.askQuestion(item))
        {
            splitData.right.push(item)
        }
        else {
            splitData.left.push(item)
        }
    }
    )
    return splitData
}

// Calculate entropy of data, assumes label is 6th from last column 
//so this must be edited for different datasets, can't get it to read by label
// and js treats the numbers as strings
function entropy(data) 
{
    let labels = Array()
    let e = 0
    data.forEach(function(item, index, array)
    {
        newLabel = item[item.length-7]
        if (labels.includes(newLabel)) 
        {
            return
        }
        labels.push(newLabel)
    }
    )

    labels.forEach(function(label, labelIndex, labelArray)
    {
        let labelCount = 0
        // Finding unique data labels
        data.forEach(function(sample, dataIndex, dataArray)
        {
            if (sample[sample.length-7] === label)
            {
                labelCount++
            }
        }
        )

        // Calculates proportion of each label and calculates entropy
        const labelRatio = labelCount/data.length
        const addEntropy = -labelRatio*Math.log2(labelRatio)
        e += addEntropy
    }
    )
    return parseFloat(e.toFixed(3))
}

// Classify data and returns array of predictions
function classifier(sample, node) 
    {
        if ((typeof node.predictions) === 'undefined')
        {
            const askQuestion = node.Question
            if (askQuestion.ask(sample))
            {
                return classifier(sample, node.branchTrue)
            }
            return classifier(sample, node.branchFalse)
        }
        return node.predictions
    }   

// Build a tree recursively
function treeBuilder(data, attributes)
{
    // Find the best question to use
    const questionToAsk = getSplit(data, attributes)
    // If undefined is returned create a new LeafNode
    if ((typeof questionToAsk) === 'undefined')
    {
        return new LeafNode(data)
    }
    // Partition the Data
    let splitData = split(data, questionToAsk)

    attributes.push(questionToAsk.index)
    treeLeft = treeBuilder(splitData.left, attributes)
    treeRight = treeBuilder(splitData.right, attributes)

    return new DecisionNode(questionToAsk, right, left)
}

module.exports = {
    treeBuilder,
    informationGain,
    entropy,
    splitData,
    getSplit,
    fit
}