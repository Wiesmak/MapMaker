/**
 * @file file.repository.ts
 * @description This module implements the FileRepositoryInterface from file.interface.ts.
 * It provides methods for saving data to a file, loading data from a file, and binding a load event.
 * @module file.repository
 */

import {FileRepositoryInterface} from "./file.interface.ts"
import * as msgpack from 'msgpack-lite'

export class FileRepository implements FileRepositoryInterface {
  protected readonly fileName: string;
  protected listeners: ((data: object) => void)[] = [];

  constructor() {
    this.fileName = 'export.map'
  }

  protected notifyListeners(data: object): void {
    this.listeners.forEach(listener => listener(data));
  }

  public saveToFile(data: object): void {
    const binaryData = msgpack.encode(data);
    const blob = new Blob([binaryData], {type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  public async loadFromFile(file: File): Promise<object> {
    const reader = new FileReader();
    const fileReadPromise = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
    // @ts-ignore
    reader.readAsArrayBuffer(file);
    const arrayBuffer = await fileReadPromise;
    // @ts-ignore
    const data = msgpack.decode(new Uint8Array(arrayBuffer));
    this.notifyListeners(data);
    return data;
  }

  public bindLoad(callback: (data: object) => void): void {
    this.listeners.push(callback);
  }
}