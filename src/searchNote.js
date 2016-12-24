// 同步数据库至印象笔记
const config = require('./config');
const fs = require('fs');
const path = require('path');
const lib = require('./lib');

//

function searchNote(obj) {
    const db = config.getDb();
    const noteStore = config.getNoteStore();
    return new Promise((resolve, reject) => {
    	const {name} = obj;
    	// 先判断印象笔记是否存在
    	noteStore.findNotesMetadata({
            words: name
        }, 0, 10, {includeTitle: true})
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}

// searchNote({
// 	name: 'db.json'
// })

module.exports = searchNote;