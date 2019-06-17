import { LocalStorageException } from './../exceptions/local-storage-exception';

export class StorageBase{

  public static setItem(key: string, value: object) {
    StorageBase.isSupport();
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItem<T>(key: string) {
    StorageBase.isSupport();
    return <T>JSON.parse(localStorage.getItem(key));
  }

  public static listItem() {
    StorageBase.isSupport();
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      console.log(key, value);
    }  
  }

  public remove(key: string) {
    StorageBase.isSupport();
    localStorage.removeItem(key);
  }

  public clear() {
    StorageBase.isSupport();
    localStorage.clear();
  }

  public static isSupport() {
    if (!window.localStorage) {
      throw new LocalStorageException('localStorage not supported!');
    }
  }

}
