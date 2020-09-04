
const {ccclass, property} = cc._decorator;

@ccclass
export default class LineEmmiter extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(Number)
    rate: number = 0.1;

    @property(Number)
    speed: number = 1000;

    @property(cc.Vec2)
    offset: cc.Vec2 = cc.Vec2.ZERO;

    @property(Number)
    rotation: number = 0;

    @property(Number)
    spin: number = 0;

    start () {
        this.schedule(this.generateNode.bind(this), this.rate, cc.macro.REPEAT_FOREVER);
    }

    update (dt) {
        this.autoRotation(dt);
    }

    autoRotation(dt) {
        if (this.spin === 0) {
            return;
        }
        this.rotation += dt * this.spin;
    }

    generateNode() {
        let node = cc.instantiate(this.prefab);
        let position = cc.Vec2.ZERO;
        this.offset.add(this.node.position, position);
        node.zIndex = -1;
        node.position = position; 
        node.parent = this.node.parent;
        node.angle = -this.rotation;

        //计算终点
        let endPoint = cc.v2();
        endPoint.x = cc.winSize.height * Math.sin(this.rotation * Math.PI / 180);
        endPoint.y = cc.winSize.height * Math.cos(this.rotation * Math.PI / 180);

        let distance = endPoint.sub(node.position).mag();
        let duration = distance / this.speed;

        let moveBy = cc.moveBy(duration, endPoint);
        let removeSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, removeSelf);
        node.runAction(sequence);
    }

}
