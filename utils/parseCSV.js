const csv=require('csvtojson')
const parse=require('csv-parse')
const fs=require('fs')
const output='./result.json'
// Meadhbh with fixes by Jack
module.exports=
{
    loadCSVData: function(filename) 
    {
        let dataArray = Array()
        const inputLines = fs.readFileSync(filename, 'utf-8')
            .split('\r\n')
        inputLines.forEach(function(line, i , array) 
        {
            let sample = []
            attributes=line.split(',')
            attributes.forEach(function(value, j, arr) 
            {
                sample.push(value)
            }
            )
            dataArray.push(sample)
        }
        )
        return dataArray
    }
}