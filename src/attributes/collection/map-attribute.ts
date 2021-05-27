import Attribute from "../base-attribute";
import CollectionAttribute from "./collection-base-attribute";

class MapAttribute implements CollectionAttribute {

    name: string;
    get type(): string {
        return `map<${this.keyType.type}, ${this.valueType.type}>`;
    }
    keyType: Attribute;
    valueType: Attribute;

    constructor(name: string, { keyType, valueType }: { keyType: Attribute, valueType: Attribute }) {
        this.name = name;
        this.keyType = keyType;
        this.valueType = valueType;
    }

}

export default MapAttribute;