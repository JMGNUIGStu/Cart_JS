const Question = require('./Question.js').Question
const DecisionNode = require('./DecisionNode.js').DecisionNode
const LeafNode = require('./LeafNode.js').LeafNode


// Return predictions
function fit(tree, data) 
{
    let predictions = []
    data.forEach(function(sample, index, array) 
    {
        predictions.push(classifier(sample, tree))
    }
    )
    return predictions
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
        if (questionToAsk.ask(item))
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

// Identifies question with highest information gain and returns it
function getSplit(data, attributes)
{
    let infoGain = 0
    let questionToAsk = undefined
    const featuresCount = data[0].length-1

    for(let featureNumber=0; featureNumber < featuresCount; featureNumber++) 
    {
        if (attributes.includes(featureNumber))
        {
            continue
        }
        data.forEach(function(sample, index, array)
        {
            const tempQuestion = new Question(sample[featureNumber], featureNumber)
            const tempInfoGain = informationGain(data, tempQuestion)
            if (tempInfoGain > infoGain)
            {
                infoGain = tempInfoGain
                questionToAsk = tempQuestion
            }
        }
        )
    }
    return questionToAsk
}

//Calculates the information gain for a passed question
function informationGain(data, questionToAsk)
{
    const dataSplit = splitData(data, questionToAsk)
    const splitLeft = dataSplit.left
    const splitRight = dataSplit.right
    const proportionLeft = splitLeft.length/data.length
    const proportionRight = splitRight.length/data.length
    const informationGain = entropy(data) - ((proportionLeft*entropy(splitLeft))-(proportionRight*entropy(splitRight)))
    return parseFloat(informationGain.toFixed(2))
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
            const askQuestion = node.question
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
    let dataSplit = splitData(data, questionToAsk)

    attributes.push(questionToAsk.index)
    treeLeft = treeBuilder(dataSplit.left, attributes)
    treeRight = treeBuilder(dataSplit.right, attributes)

    return new DecisionNode(questionToAsk, treeRight, treeLeft)
}

function transform(node, attributes)
{
    if (attributes.index < node.value)
    {
        if (node.includes(index))
        {
            return transform(node.left, attributes)
        }
        else 
            return Node.node
    }
    if (node.includes(index))
        {
            return transform(node.right, attributes)
        }
        else 
            return Node.node
}

module.exports = {
    treeBuilder,
    informationGain,
    entropy,
    splitData,
    getSplit,
    fit
}