import { Injectable } from '@nestjs/common';
import { Attribute, AttributeType } from '../core/attribute.type';
import { promises } from 'dns';


interface IStoreValue {
  [key: string]: Attribute;
}

@Injectable()
export class MymemoryService {
  private store = new Map<string, IStoreValue>();
  private attributeTypes = new Map<string, AttributeType>();

  private getType(value: any): AttributeType {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    throw new Error('Unsupported attribute type');
  }

  async put(key: string, attributePairs: [string, string][]) {

    const value: IStoreValue = {};

    attributePairs.forEach(([attrKey, attrValue], key) => {
      const attrType = this.getType(attrValue);

      //check for type consistency
      if (this.attributeTypes.has(attrKey) && this.attributeTypes.get(attrKey) !== attrType) {
        throw new Error(`Type mismatch for attribute '${attrKey}'. Expected ${this.attributeTypes.get(attrKey)}`);
      }

      if (!this.attributeTypes.has(attrKey)) {
        this.attributeTypes.set(attrKey, attrType)
      }

      value[attrKey] = new Attribute(attrKey, attrValue, attrType);

    })


    this.store.set(key, value)

  }

  async get(key: string):Promise<IStoreValue> {
    return this.store.get(key)
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async keys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }

  async search(attributeKey: string):Promise<IStoreValue[]>{
    const result: IStoreValue[] = [];
    console.log("seraching:", ":::::::::> ", attributeKey)
    this.store.forEach((value, key) => {
      console.log(key, ":::::::::> ", value)
      if (key.includes(attributeKey)  &&   value) {
        result.push(value);
      }
    });
    return result;
  }

  getHello(): string {
    return 'Hello World from mymemory!';
  }


}
