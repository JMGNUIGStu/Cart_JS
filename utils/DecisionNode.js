// Holds references and child branches for questions -- Jack
function DecisionNode(question, branchTrue, branchFalse)
{
    this.question = question
    this.branchTrue = branchTrue
    this.branchFalse = branchFalse
}

module.exports = {
    DecisionNode: DecisionNode
}