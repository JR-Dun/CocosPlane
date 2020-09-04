const {ccclass, property} = cc._decorator;

@ccclass
export default class Dragable extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this), this);
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    start () {

    }

    // update (dt) {}

    touchMove (event) {
        let delta = event.getDelta();
        let node = this.target || this.node;
        // console.log("!! ", delta);
        node.position = delta.add(node.position);
    }
}
