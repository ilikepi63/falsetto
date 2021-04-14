interface ClusteringColumnConstructor {
    direction: ClusteringDirection;
    name: string;
}
export declare enum ClusteringDirection {
    asc = "asc",
    desc = "desc"
}
export default class ClusteringColumn {
    direction: ClusteringDirection;
    name: string;
    constructor({ direction, name }: ClusteringColumnConstructor);
}
export {};
