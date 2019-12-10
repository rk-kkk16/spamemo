/**
 * indexedDBを用いたメモデータベース
 *
 */

class MemoDB {
    static get DB_NAME() {
        return 'MemoDB';
    }
    static get STORE_NAME() {
        return 'memo';
    }

    //DB接続 非同期で接続インスタンスが取得されるのでpromiseにしてる
    async connect() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this);
                return;
            }

            const req = indexedDB.open(MemoDB.DB_NAME);

            req.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(MemoDB.STORE_NAME, {keyPath: 'id', autoIncrement: true});
            };

            req.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this);
            };
        });
    }

    getTransaction(stores, readWrite = 'readwrite') {
        return this.db.transaction(stores, readWrite);
    }

    getStore() {
        return this.getTransaction([MemoDB.STORE_NAME]).objectStore(MemoDB.STORE_NAME);
    }

    add(data) {
        const store = this.getStore().add(data);
        store.onsuccess = function() {
            console.log('save success.');
        };
    }

    remove(id) {
        console.log(id);
        const store = this.getStore().delete(id);
        store.onsuccess = function() {
            console.log('delete success.');
        };
    }

    update(id, data) {
        data.id = id;
        const store = this.getStore().put(data);
        store.onsuccess = function() {
            console.log('update success.');
        };
    }

    //requestオブジェクトの形で取得 onsuccessでデータが得られた後の処理を実装
    async get(id) {
        return new Promise((resolve, reject) => {
            var req = this.getStore().get(id);
            req.onsuccess = function() {
                var row = req.result;
                var res = {id: 0, rawdata: ''};
                if (row) {
                    res.id = row.id;
                    res.rawdata = row.data;
                }
                resolve(res);
            };
            req.onerror = reject;
        });
        var row = this.getStore().get(id);
        if (row) {
            return {id:row.value.id, rawdata:row.value.data};
        }
        return null;
    }

    //最新のメモデータ1件だけを取得 onsuccessでデータが得られた後の処理を実装
    async getLatest() {
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            store.openCursor(IDBKeyRange.lowerBound(1), 'prev').onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    var data = {id:cursor.value.id, rawdata:cursor.value.data};
                }
                resolve(data);
            };
        });
    }

    //件数取得
    async getCount() {
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            var countReq = store.count();
            countReq.onsuccess = function() {
                resolve(countReq.result);
            };
        });
    }

    //debug 全件取得
    async getAll() {
        return new Promise((resolve, reject) => {
            let memos = [];
            const store = this.getStore();
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    var data = {id:cursor.value.id, lastModified:'', excerpt:''};
                    //ここで一覧表示用のデータを分離しておく
                    var rawdata = cursor.value.data;
                    var spldata = rawdata.split(';', 3);
                    data.lastModified = spldata[1];
                    data.excerpt = spldata[2].substr(0,10)+'…';
                    data.excerpt = data.excerpt.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                    memos.push(data);
                    cursor.continue();
                }

                resolve(memos);
            };
        });
    }

    // @todo カーソルを使ってのリスト取得
    async getFromTo(offsetFrom, getNum) {
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            let memos = [];
            var advancing = true;
            store.openCursor(IDBKeyRange.lowerBound(1), 'prev').onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (advancing && offsetFrom > 1) {
                        cursor.advance(offsetFrom); //指定開始位置へ飛ぶ
                        advancing = false;
                    } else {
                        advancing = false;
                        var data = {id:cursor.value.id, lastModified:'', excerpt:''};
                        //ここで一覧表示用のデータを分離しておく
                        var rawdata = cursor.value.data;
                        var spldata = rawdata.split(';', 3);
                        data.lastModified = spldata[1];
                        data.excerpt = spldata[2].substr(0,10)+'…';
                        data.excerpt = data.excerpt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        memos.push(data);
                        if (memos.length < getNum) {
                            cursor.continue();
                        }
                    }
                }
                resolve(memos);
            };
        });
    }
}

export default new MemoDB();

