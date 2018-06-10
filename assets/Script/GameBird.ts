/**
 * Created by Goes_by on 09/06/2018.
 */

const {ccclass, property} = cc._decorator;
@ccclass

export default class GameBird extends cc.Component {

    @property([cc.SpriteFrame])
    spFlyingFrames: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    spBird: cc.Sprite;

    currentFlyingFrame: number = 0;

    currentAcc: number = 0;

    onLoad () {

        this.schedule(this.updateFlyingFrame, 0.2);
    }

    // start () {
    //
    // }

    doUpdateFLy(dt: number) {
        this.currentAcc -= dt * 300;
        this.node.position = cc.v2(this.node.position.x, this.node.position.y + this.currentAcc * dt);

        this.node.rotation = - (this.currentAcc / 3);
        // console.log(this.currentAcc, this.node.rotation);
    }

    update (dt: number) {

    }

    flyUp() {
        this.currentAcc = 130;
        this.currentAcc = Math.min(250, this.currentAcc);
    }

    updateFlyingFrame() {
        this.currentFlyingFrame ++;
        if (this.currentFlyingFrame == this.spFlyingFrames.length) {
            this.currentFlyingFrame = 0;
        }
        this.spBird.spriteFrame = this.spFlyingFrames[this.currentFlyingFrame];
    }

}
