import Attribute from "../base-attribute";
import CollectionAttribute from "./collection-base-attribute";

class SetAttribute implements CollectionAttribute {

    name: string;
    get type(): string {
        return `set<${this.baseType.type}>`;
    }
    baseType: Attribute;

    constructor(name: string, type: Attribute) {
        this.name = name;
        this.baseType = type;
    }

}

export default SetAttribute;