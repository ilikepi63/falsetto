import { AsciiAttribute, BigIntAttribute, BlobAttribute, BooleanAttribute, CounterAttribute, DateAttribute, DecimalAttribute, DoubleAttribute, DurationAttribute, FloatAttribute, InetAttribute, IntAttribute, SmallIntAttribute, TextAttribute, TimeAttribute, TimestampAttribute, TimeuuidAttribute, TinyintAttribute, UuidAttribute, VarcharAttribute, VarintAttribute } from "../src/index";

describe("Attribute Test Suite", () => {

    it("Should create an ascii attribute with the correct properties", () => {
        const attr = new AsciiAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("ascii");
    });

    it("Should create an bigint attribute with the correct properties", () => {
        const attr = new BigIntAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("bigint");
    });

    it("Should create an blob attribute with the correct properties", () => {
        const attr = new BlobAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("blob");
    });

    it("Should create an boolean attribute with the correct properties", () => {
        const attr = new BooleanAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("boolean");
    });

    it("Should create an counter attribute with the correct properties", () => {
        const attr = new CounterAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("counter");
    });

    it("Should create an date attribute with the correct properties", () => {
        const attr = new DateAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("date");
    });

    it("Should create an decimal attribute with the correct properties", () => {
        const attr = new DecimalAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("decimal");
    });


    it("Should create an double attribute with the correct properties", () => {
        const attr = new DoubleAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("double");
    });


    it("Should create an duration attribute with the correct properties", () => {
        const attr = new DurationAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("duration");
    });


    it("Should create an float attribute with the correct properties", () => {
        const attr = new FloatAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("float");
    });


    it("Should create an inet attribute with the correct properties", () => {
        const attr = new InetAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("inet");
    });


    it("Should create an int attribute with the correct properties", () => {
        const attr = new IntAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("int");
    });


    it("Should create an smallint attribute with the correct properties", () => {
        const attr = new SmallIntAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("smallint");
    });



    it("Should create an text attribute with the correct properties", () => {
        const attr = new TextAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("text");
    });


    it("Should create an time attribute with the correct properties", () => {
        const attr = new TimeAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("time");
    });


    it("Should create an timestamp attribute with the correct properties", () => {
        const attr = new TimestampAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("timestamp");
    });


    it("Should create an timeuuid attribute with the correct properties", () => {
        const attr = new TimeuuidAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("timeuuid");
    });


    it("Should create an tinyint attribute with the correct properties", () => {
        const attr = new TinyintAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("tinyint");
    });


    it("Should create an uuid attribute with the correct properties", () => {
        const attr = new UuidAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("uuid");
    });

    it("Should create an varchar attribute with the correct properties", () => {
        const attr = new VarcharAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("varchar");
    });



    it("Should create an varint attribute with the correct properties", () => {
        const attr = new VarintAttribute("test");
        expect(attr.name).toBe("test");
        expect(attr.type).toBe("varint");
    });

});