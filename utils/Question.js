function Question(value, index) // -- Jack
{
    this.value = value
    this.index = index
    this.ask = function(sample) 
    {
        if(isNaN(sample[index]))
        {
            return (this.value === sample[index])
        }
        return this.value > sample[index]
    }
}

module.exports = {
    Question: Question
}