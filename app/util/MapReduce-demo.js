/* globals Promise */
const
    start = new Date(),
    fs = require('fs-extra'),
    mapreduce = require('./MapReduce')(),

    /**
     * @param {String} filename filename
     * @returns {Promise} promise
     */
    readFile = async (filename) => {
        try {
            return await new Promise((resolve, reject) => {
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        reject(err)
                    }
                    resolve([`${Math.random()}`, data])
                })
            })
        } catch (error) {
            return console.error(error)
        }
    },

    /**
     * @param {String} key key
     * @param {Array<Object>} data data
     * @returns {Number} mapper
     */
    map = (key, data) => {
        const
            list = [],
            aux = {}

        data
            .replace(/\W/g, ' ')
            .split(' ')
            .forEach((ww) => {
                aux[ww] = ww === '' ? 0 : (aux[ww] || 0) + 1
            })
        Object.keys(aux).forEach((kk) => list.push([kk, aux[kk]]))

        return list
    },

    /**
     * @param {String} key key
     * @param {Array<Object>} data data
     * @returns {Number} reducer
     */
    reduce = (key, data) => {
        let sum = 0

        data.forEach((ee) => {
            sum += ee
        })

        return sum
    }

/**
 * @returns {void}
 */
const run = async () => {
    let i = 0
    const data = []

    while (i++ < 50) {
        data.push(readFile('./app/_data/_generator.lorem-ipsum.info._inter.txt'))
        data.push(readFile('./app/_data/_generator.lorem-ipsum.info._latin.txt'))
        data.push(readFile('./app/_data/_lipsum.com.txt'))
        data.push(readFile('./app/_data/_loremipsumgenerator.com.txt'))
        data.push(readFile('./app/_data/_lipsum.com.txt'))
    }

    mapreduce(await Promise.all(data), map, reduce, (result) => {
        console.log([result, i, new Date() - start])
    })
}

run()