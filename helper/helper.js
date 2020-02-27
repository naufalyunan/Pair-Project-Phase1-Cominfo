function getAverage(arrays){
    let sum = arrays.reduce((a, b) => a + b, 0)
    let average = sum/arrays.length
    return average
}

module.exports = getAverage