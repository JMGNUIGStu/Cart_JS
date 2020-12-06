function LeafNode(data)
{
    this.data = data
    let predictions = {}
    data.forEach(function(item, index, array)
    {
        let label = item[item.length-7]
        if (label in predictions)
        {
            predictions[label]++
            return
        }
        predictions[label] = 1
    }
    )
    this.predictions=predictions
}

module.exports = {
    LeafNode: LeafNode
}