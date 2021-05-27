import { TextAttribute } from "../src";
import ListAttribute from "../src/attributes/collection/list-attribute";
import MapAttribute from "../src/attributes/collection/map-attribute";
import SetAttribute from "../src/attributes/collection/set-attribute";


describe("Collection Attributes Test Suite", () => {

    it("Should create a set attribute", () => {

        const setAttribute = new SetAttribute("set", new TextAttribute("email"));

        expect(setAttribute.name).toBe("set");
        expect(setAttribute.type).toBe("set<text>");
    });

    it("Should create a list attribute", () => {

        const listAttribute = new ListAttribute("list", new TextAttribute("email"));

        expect(listAttribute.name).toBe("list");
        expect(listAttribute.type).toBe("list<text>");

    });

    it("Should create a map attribute", () => {

        const mapAttribute = new MapAttribute("map", { keyType: new TextAttribute("email"), valueType: new TextAttribute("value") });

        expect(mapAttribute.name).toBe("map");
        expect(mapAttribute.type).toBe("map<text, text>");

    });

});