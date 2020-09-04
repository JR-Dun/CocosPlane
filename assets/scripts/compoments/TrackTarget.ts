
const {ccclass, property} = cc._decorator;

@ccclass
export default class TrackTarget extends cc.Component {

    private _target: cc.Node = null;
    private _speedUnit: number = 0;
    private _offset: cc.Vec2 = cc.Vec2.ZERO;

    start () {

    }

    update (dt) {
        if(this._target && this._speedUnit) {
            this.goTrack(dt);
        }
    }

    onDestroy () {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
    }

    public setTrack (target: cc.Node, speed: number, offset: cc.Vec2) {
        this._target = target;
        this._speedUnit = speed;
        this._offset = offset;
    }

    goTrack (dt) {
        let targetPosition = new cc.Vec2();
        let position = new cc.Vec2();
        let world = new cc.Vec2();
        this._target.parent.convertToWorldSpaceAR(this._target.position, world);
        this.node.parent.convertToNodeSpaceAR(world, targetPosition);
        this._offset.add(targetPosition, position);

        let speed = this._speedUnit * dt;
        let point = cc.v2(this.node.x, this.node.y);
        let delta = position.sub(point);
        let distance = point.sub(position).mag();
        let x2 = point.x + speed * delta.x / distance;
        let y2 = point.y + speed * delta.y / distance;
        let newPosition = cc.v2(x2, y2);
        let x1 = point.x;
        let y1 = point.y;
        let deltaRotation = 90 - Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        this.node.angle = -deltaRotation;
        if(distance <= 10 ) {
            this.node.removeFromParent();
            return;
        } 
        this.node.setPosition(newPosition); // 设置跟踪的位置
    }
}
