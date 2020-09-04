import CatchTarget from "./CatchTarget";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CatchEmmiter extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Node)
    targetEnd: cc.Node = null;

    start () {
        this.shot()
    }

    shot() {
        let node = cc.instantiate(this.prefab);
        node.zIndex = -1;
        node.position = cc.Vec2.ZERO; 
        node.parent = this.node;

        let catchTarget = node.getComponent(CatchTarget);
        catchTarget.setTarget(this.targetEnd);
    }
}
