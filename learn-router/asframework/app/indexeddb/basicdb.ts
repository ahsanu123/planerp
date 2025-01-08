// Reference: 
// https://medium.com/miro-engineering/how-to-create-fake-back-end-using-indexeddb-388d6f266eb0
//

const DB_NAME = "idb_backend_demo"

interface DemoElement {
  id: string,
  name: string,
  collectionId: string,
}

interface FileUploader {
  uploadFile(file: File): Promise<{ data: { id: string, name: string } }>
}

export interface IFakeBackendDemo {
  /**
   * [GET] /elements/{elementId} -> DatabaseItem
   * @param id element id
   * @returns element with the given id or throws exception if not found
  */
  getElementById(id: string): Promise<DemoElement>

  /**
   * [POST] /elements/{collectionId} -> DatabaseItem
   * HTTP Body {File} file
   * @param collectionId id of the collection to which the element belongs
   * @returns newly created element
  */
  createElement(collectionId: string, file: File): Promise<DemoElement>

  /**
   * [PATCH] /elements/{elementId} -> DatabaseItem
   * HTTP Body {File} file
   * @param element updated element data
   * @returns updated element with the given id
  */
  updateElement(element: DemoElement): Promise<DemoElement>

  /**
   * [DELETE] /elements/{elementId} -> void
   * @param id id of the element to delete
  */
  deleteElement(id: string): Promise<void>

  /**
   * [GET] /elements/?collectionId={collectionId} -> DatabaseItem[]
   * @param collectionId id of the collection to which the elements belong
   * @returns all elements with the given collectionId
  */
  getElementsByCollectionId(collectionId: string): Promise<DemoElement[]>
}

export class FakeBackendDemo implements IFakeBackendDemo {

  private db?: IDBDatabase
  private fileUploader: FileUploader

  constructor(
    fileUploader: FileUploader
  ) {
    const request = window.indexedDB.open(DB_NAME)
    this.fileUploader = fileUploader

    request.onerror = () => {
      throw new Error("cant connect to indexed db")
    }

    request.onsuccess = (event) => {
      this.db = (event.target as IDBRequest<IDBDatabase>).result
    }

    request.onupgradeneeded = (event) => {
      console.log("onupgradeneeded: ", event)
    }
  }

  getElementById(id: string): Promise<DemoElement> {
    if (!this.db) {
      throw new Error('db is not initialized')
    }

    const transaction = this.db.transaction('elements', 'readonly')
    const elementStore = transaction.objectStore('elements')
    const request = elementStore.get(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(new Error(`element with id ${id} not found`))
      }
    })
  }

  async createElement(collectionId: string, file: File): Promise<DemoElement> {
    if (!this.db) {
      throw new Error('DB not initialized')
    }

    const { data } = await this.fileUploader.uploadFile(file)

    const newElement = {
      id: data.id,
      name: data.name,
      collectionId,
    }

    const request = this.db.transaction('elements', 'readwrite')
      .objectStore('elements')
      .add(newElement)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(newElement)
      }
      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  updateElement(element: DemoElement): Promise<DemoElement> {
    if (!this.db) {
      throw new Error('DB not initialized')
    }
    const request = this.db.transaction('elements', 'readwrite')
      .objectStore('elements')
      .put(element)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(element)
      }
      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  deleteElement(id: string): Promise<void> {
    if (!this.db) {
      throw new Error('DB not initialized')
    }
    const request = this.db.transaction('elements', 'readwrite').objectStore('elements').delete(id)
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve()
      }
      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  getElementsByCollectionId(collectionId: string): Promise<DemoElement[]> {
    if (!this.db) {
      throw new Error('DB not initialized')
    }
    const transaction = this.db.transaction('elements', 'readonly')
    const elementStore = transaction.objectStore('elements')
    const index = elementStore.index('collectionId')
    const request = index.getAll(collectionId)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request.error)
      }
    })
  }

}
