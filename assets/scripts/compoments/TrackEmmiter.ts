import TrackTarget from "./TrackTarget";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TrackEmmiter extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(Number)
    rate: number = 0.1;

    @property(Number)
    speed: number = 1000;

    @property(cc.Vec2)
    offset: cc.Vec2 = cc.Vec2.ZERO;

    @property(cc.Node)
    targetEnd: cc.Node = null;

    start () {        
        this.schedule(this.generateNode.bind(this), this.rate, cc.macro.REPEAT_FOREVER);
    }


    generateNode() {
        let node = cc.instantiate(this.prefab);
        let position = cc.Vec2.ZERO;
        this.offset.add(this.node.position, position);
        node.zIndex = -1;
        node.position = position; 
        node.parent = this.node.parent;

        let track = node.addComponent(TrackTarget);
        track.setTrack(this.targetEnd, this.speed, this.offset);
    }
}
