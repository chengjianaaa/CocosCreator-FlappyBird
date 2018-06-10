import GameBird from "./GameBird";
/**
 * Created by Goes_by on 09/06/2018.
 */

const {ccclass, property} = cc._decorator;
@ccclass

export default class GamePillar extends cc.Component {

    @property(cc.Node)
    topPillar: cc.Node;

    @property(cc.Node)
    bottomPillar: cc.Node;

    spaceALtitude: number = 0;
    space: number = 60;

    isPassedBird: boolean = false;
    onLoad() {

        this.randomAltitude();
    }

    randomAltitude() {
        //640  (300, 500)
        let spaceALtitude = (200 - Math.floor((Math.random() * 300))) / 2;

        this.topPillar.position = cc.v2(0, spaceALtitude + this.space);
        this.bottomPillar.position = cc.v2(0, spaceALtitude - this.space);

        this.spaceALtitude = spaceALtitude;
    }

    setIsPassedBird(isPassBird: boolean) {
        this.isPassedBird = isPassBird;
    }

    // start () {
    //
    // }

    update (dt: number) {

    }

    checkCollion(bird: GameBird) {

        // let selfX = this.node.position.x;
        // let selfY = this.node.position.y;

        if ((bird.node.position.x + bird.node.width / 2) < (this.node.position.x - this.topPillar.width / 2)) {
            return false;
        }

        if ((bird.node.position.x - bird.node.width / 2) > (this.node.position.x + this.topPillar.width / 2)) {
            return false;
        }

        if ((bird.node.position.y + bird.node.height / 2) > (this.spaceALtitude + this.space)) {
            return true;
        }

        if ((bird.node.position.y - bird.node.height / 2) < (this.spaceALtitude - this.space)) {
            return true;
        }

        return false;
    }


}
