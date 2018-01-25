/**
 * When processing large dataset, reduce and comparing the value directly
 * is slightly faster instead of using Math.min / Math.max;
 * While spreading array to Math.min / Math.max as arguments may result in
 * stack overflow due to recursive ops on native function
 *
 * @module
 * @name util
 * @returns {*} util
 */

let tmp = 0
let data = 0

export const

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @param {Boolean} desc if truthy then sort by descending order
     * @returns {Number} Max number in array / collection of numeric
     */
    rSort = (data = [0], desc = false) => data.sort((AA, BB) => {
        return desc ? BB - AA : AA - BB
    }),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Max number in array / collection of numeric
     */
    rMax = (data = [0]) => data.reduce((prev, curr) => {
        return curr > prev ? curr : prev
    }),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Min number in array / collection of numeric
     */
    rMin = (data = [0]) => data.reduce((prev, curr) => {
        return curr < prev ? curr : prev
    }),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the sum of array / collection of numeric
     */
    rSum = (data = [0]) => data.reduce((prev, curr) => {
        return curr + prev
    }),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Wrapper of length in array / collection of numeric
     */
    rCount = (data = [0]) => data.length,

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the average of array / collection of numeric
     */
    rMean = (data = [0]) => rSum(data) / rCount(data),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the average of array / collection of numeric
     */
    rRange = (data = [0]) => rMax(data) - rMin(data),

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @param {Boolean} needSort if falsy skip sort
     * @returns {Number} Calculate the median of array / collection of numeric
     */
    rMedian = (data = [0], needSort = true) => {
        tmp = {
            data: needSort ? rSort(data) : data,
            mid: data.length / 2,
        }

        return tmp.mid % 1 > 0
            ? tmp.data[Math.floor(tmp.mid)]
            : (tmp.data[tmp.mid - 1] + tmp.data[tmp.mid]) / 2
    },

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @param {Boolean} needSort if falsy skip sort
     * @returns {Number} Calculate the median of array / collection of numeric
     */
    rQuartile1 = (data = [0], needSort = true) => {
        tmp = {
            data: needSort ? rSort(data) : data,
            mid: data.length / 2,
        }

        return rMedian(tmp.mid % 1 > 0
            ? tmp.data.slice(0, Math.floor(tmp.mid))
            : tmp.data.slice(0, tmp.mid - 1))
    },

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @param {Boolean} needSort if falsy skip sort
     * @returns {Number} Calculate the median of array / collection of numeric
     */
    rQuartile3 = (data = [0], needSort = true) => {
        tmp = {
            data: needSort ? rSort(data) : data,
            mid: data.length / 2,
        }

        return rMedian(tmp.mid % 1 > 0
            ? tmp.data.slice(Math.floor(tmp.mid))
            : tmp.data.slice(tmp.mid))
    },

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the variance of array / collection of numeric
     */
    rMeanDev = (data = [0]) => {
        tmp = rMean(data)

        return rMean(data.map((val) => Math.abs(val - tmp)))
    },

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the variance of array / collection of numeric
     */
    rVar = (data = [0]) => {
        tmp = rMean(data)

        return rMean(data.map((val) => Math.pow(val - tmp, 2)))
    },

    /**
     * @param {Array<Number>} data array / collection of numeric
     * @returns {Number} Calculate the standard deviation of array / collection of numeric
     */
    rStdDev = (data = [0]) => Math.pow(rVar(data), 0.5),

    /**
     * @param {Number} max maximum number to random from 0
     * @returns {Number} new random number
     */
    rRandomInt = (max) => Math.floor(Math.random() * max),

    /**
     * @param {Array<Object>} arr array of object
     * @returns {Object} one random element from array
     */
    rRandomFrom = (arr) => arr[rRandomInt(arr.length)],

    /**
     * @param {Number} len length of random string
     * @param {String} src source string seed, default to 62 based
     * @returns {Object} random string
     */
    rRandomString = (len, src = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => {
        let out = ''

        while (out.length < len) {
            out += src.charAt(rRandomInt(src.length))
        }

        return out
    },
    rAverage = rMean,
    rQuartile2 = rMedian,
    rMeanDeviation = rMeanDev,
    rMeanAbsoluteDeviation = rMeanDev,
    rAverageDeviation = rMeanDev,
    rAverageAbsoluteDeviation = rMeanDev,
    rVariance = rVar,
    rStandardDeviation = rStdDev

data = []
tmp = {
    dept: ['it', 'finance', 'hr', 'field']
}

while (data.length < 10e6) {
    data.push({
        seed: rRandomString(10),
        dept: rRandomFrom(tmp.dept),
        salary: rRandomInt(1e9) + 1,
    })
}