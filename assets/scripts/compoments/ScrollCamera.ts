const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollCamera extends cc.Component {

    @property(Number)
    speed: number = 300;

    @property([cc.Node])
    loopGrounds: Array<cc.Node> = [];

    camera: cc.Camera = null;

    start () {
        this.camera = this.node.getComponent(cc.Camera);
    }

    update (dt) {
        let current = this.loopGrounds[1];
        let pt = cc.Vec2.ZERO;
        this.camera.getWorldToScreenPoint(current.position, pt);
        if(pt.y <= -cc.winSize.height) {
            let first = this.loopGrounds[0];
            let last = this.loopGrounds[this.loopGrounds.length - 1];
            this.loopGrounds.shift();
            this.loopGrounds.push(first);
            current.y = last.y + (last.height + current.height) / 2;
        }
        this.node.y += dt * this.speed;
    }
}
