import BatchExecutable from "../src/executables/batch-executable";
import { Client, } from "cassandra-driver";
import MultiExecutable from "../src/executables/multi-executable";
import SingleExecutable from "../src/executables/single-executable";

class MockClient extends Client {
    execute = jest.fn();
    batch = jest.fn();
}


describe("Executable Test Suite", () => {

    const client = new MockClient({
        contactPoints: ["test"],
        keyspace: ""
    });

    it("Should create a batch call", () => {

        const executable = new BatchExecutable([]);

        executable.execute(client);

        expect(client.batch.mock.calls.length).toBe(1);
        expect(client.batch.mock.calls[0][0]).toStrictEqual([]);



    });

    it("Should create a single call", () => {

        const executable = new MultiExecutable([new SingleExecutable("", [])]);

        executable.execute(client);

        expect(client.execute.mock.calls.length).toBe(1);
        expect(client.execute.mock.calls[0][0]).toBe("");
        expect(client.execute.mock.calls[0][1]).toBe([]);


    });

    it("Should create a multi call", () => {

        const executable = new BatchExecutable([]);

        // executable.execute(mockClient);

        // expect(mockClient.execute).toHaveBeenCalledTimes(1);


    });

});