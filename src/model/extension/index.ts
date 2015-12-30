import {Record, Map} from "immutable";


export default class ExtensionModel extends Record({
    calcs: Map(),
    events: Map(),
    nodes: Map()
}) {
    calcs: Map<any, any>;
    events: Map<any, any>;
    nodes: Map<any, any>;

    addNode(nodeName, node) {
        return this.set("nodes", this.nodes.set(nodeName, node));
    }

    deleteNode(nodeName) {
        return this.set("nodes", this.nodes.delete(nodeName));
    }

}
