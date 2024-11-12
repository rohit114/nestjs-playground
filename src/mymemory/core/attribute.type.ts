export type AttributeType = 'string' | 'number' | 'boolean' 


export class Attribute {
    key: string;
    value: string | number | boolean
    type: AttributeType

    constructor(key: string, value: string | number | boolean, type: AttributeType){
        this.key = key;
        this.value = value
        this.type = type
    }
    toString(): string {
        return `${this.key}: ${this.value}`;
    }
}