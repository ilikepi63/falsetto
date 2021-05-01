/* eslint-disable no-unused-vars */
interface ClusteringColumnConstructor {
    direction?: ClusteringDirection;
    name: string;
}

export enum ClusteringDirection {
    asc = "asc",
    desc = "desc"
}

export default class ClusteringColumn {
    direction: ClusteringDirection;
    name: string;

    constructor({ direction = ClusteringDirection.asc, name }: ClusteringColumnConstructor) {
        this.direction = direction;
        this.name = name;
    }
}