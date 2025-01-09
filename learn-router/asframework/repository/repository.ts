/*
 * Define General IdexedDB repository interface here
 * then use that interface to create concrete repository
 * */

import { DB_NAME, DB_VERSION } from "constant"
import { openDB } from "idb"

interface Books {
  id: number,
  title: string,
}

interface DBConnector {
  createConnection: () => void
}

function IDBBuilder<T>(object: T) {

  const createIndex = (key: string, name: string) => {

  }

  let key: keyof T;
  for (key in object) {
    console.log(key, typeof (object[key]) === "object")
  }
}

export async function createConn() {

  IDBBuilder({
    id: 1,
    name: "string",
    prop: {
      propname: "string",
      obj: 2
    }
  })
  const dbPromise = openDB('my-database', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('data')) {
        const dataStore = db.createObjectStore('data', {
          keyPath: 'id',
          autoIncrement: true
        });
        dataStore.createIndex('name', 'name', {
          unique: false
        });
        dataStore.createIndex('age', 'age', {
          unique: false
        });
      }
    },
  });

  const createData = async (name: string, age: number) => {
    const db = await dbPromise;
    const tx = db.transaction('data', 'readwrite');
    const dataStore = tx.objectStore('data');
    const id = await dataStore.add({
      name,
      age
    });
    await tx.done;
    return id;
  };

  await createData("srinivasan", 55)
  await createData("rimajunta", 60)

}
