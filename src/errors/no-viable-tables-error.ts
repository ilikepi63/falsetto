export default class NoViableTablesError extends Error {
    constructor() {
        super("No viable tables were found for the given query.");
    }
}