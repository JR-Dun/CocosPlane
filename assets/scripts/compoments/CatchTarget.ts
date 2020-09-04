
const {ccclass, property} = cc._decorator;

@ccclass
export default class CatchTarget extends cc.Component {

    @property(cc.Node)
    lineNode: cc.Node = null;

    @property(cc.Node)
    clawNode: cc.Node = null;

    private _target: cc.Node = null;
    private _offset: number = 0;

    start () {
        if(this.clawNode) {
            this._offset = this.clawNode.height;
        }
    }

    lateUpdate() {
        this.updateAngle();
    }

    public setTarget(targetNode: cc.Node) {
        this._target = targetNode;
    }

    updateAngle () {
        let targetPosition = new cc.Vec2();
        let position = new cc.Vec2();
        let world = new cc.Vec2();
        let offset = cc.v2(0, -this._offset);
        this._target.parent.convertToWorldSpaceAR(this._target.position, world);
        this.node.parent.convertToNodeSpaceAR(world, targetPosition);
        if(targetPosition.y <= this._offset * 2 && targetPosition.y >= -this._offset * 2) {
            offset = cc.v2(-this._offset, 0);
            offset.add(targetPosition, position);
            if(position.x - this._offset < 0) {
                targetPosition.sub(offset, position);
            }
        }
        else {
            offset.add(targetPosition, position);
            if(position.y - this._offset < 0) {
                targetPosition.sub(offset, position);
            }
        }

        let deltaRotation = 90 - Math.atan2(position.y, position.x) * 180 / Math.PI;
        this.lineNode.angle = -deltaRotation;
        this.lineNode.height = position.mag();

        if(targetPosition.y < this._offset * 2 && targetPosition.y > -this._offset * 2) {
            this.clawNode.angle = -180;
        }
        else {
            if(deltaRotation >= -90 && deltaRotation <= 90) {
                this.clawNode.angle = -(180 - deltaRotation);
            }
            else {
                this.clawNode.angle = deltaRotation;
            }
        } 
    }
}
