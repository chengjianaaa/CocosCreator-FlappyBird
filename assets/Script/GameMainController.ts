import GameBird from "./GameBird";
import GamePillar from "./GamePillar";
/**
 * Created by Goes_by on 09/06/2018.
 */

const {ccclass, property} = cc._decorator;
@ccclass

export default class GameMainController extends cc.Component {

    @property(cc.Prefab)
    prefabBird: cc.Prefab;

    @property(cc.Prefab)
    prefabPillar: cc.Prefab;

    @property([cc.Node])
    nodeBGs: cc.Node[] = [];

    @property(cc.Node)
    nodeLand: cc.Node;

    @property([cc.Node])
    nodeLands: cc.Node[] = [];

    @property(cc.Label)
    lbScore: cc.Label;

    @property(cc.Button)
    btnPlay: cc.Button;

    @property(cc.Node)
    nodeTutorial: cc.Node;

    @property(cc.Node)
    pillarsParent: cc.Node;

    @property(cc.Node)
    nodeGameOver: cc.Node;

    bird: GameBird;
    allPillars: GamePillar[];
    pillarSpeed: number = 50;
    landSpeed: number = 50;
    bGSpeed: number = 10;

    isPlaying: boolean = true;
    pillarCount: number = 3;
    pillarWidth: number = 52;
    birdPosX: number = -100;

    currentScore: number = 5;

    onLoad() {

        this.nodeGameOver.active = false;
        this.btnPlay.node.active = true;
        this.nodeTutorial.active = false;

        this.isPlaying = false;

        let bird = cc.instantiate(this.prefabBird).getComponent(GameBird);
        bird.node.parent = this.node;
        this.bird = bird;
        this.resetBirdPosition();

        this.allPillars = [];
        for(let i = 0; i < this.pillarCount; i++) {
            let pillar = cc.instantiate(this.prefabPillar).getComponent(GamePillar);
            pillar.node.parent = this.pillarsParent;
            this.allPillars.push(pillar);
        }
        this.resetPillarsPosition();
    }

    resetBirdPosition() {
        this.bird.node.position = cc.v2(this.birdPosX, 0);
        this.bird.node.rotation = 0;
        this.bird.currentAcc = 0;
    }

    resetPillarsPosition() {
        for(let i = 0; i < this.pillarCount; i++) {
            let pillar = this.allPillars[i];
            pillar.node.position = cc.v2(200 + ((cc.director.getWinSize().width + this.pillarWidth) / this.pillarCount) * i, 0);
        }
    }

    addScore() {
        this.currentScore ++;
        this.refreshScore();
    }

    refreshScore() {
        this.lbScore.string = this.currentScore.toString();
    }

    update (dt: number) {


        if (!this.isPlaying) {
            return;
        }

        this.bird.doUpdateFLy(dt);

        for(let i = 0, length = this.nodeLands.length; i < length; i++) {
            let land = this.nodeLands[i];
            land.x = land.x - dt * this.landSpeed;
            if (land.x < -cc.director.getWinSize().width) {
                land.x = land.x + cc.director.getWinSize().width * 2;
            }
        }

        for(let i = 0, length = this.nodeBGs.length; i < length; i++) {
            let bg = this.nodeBGs[i];
            bg.x = bg.x - dt * this.bGSpeed;
            if (bg.x < -cc.director.getWinSize().width) {
                bg.x = bg.x + cc.director.getWinSize().width * 2;
            }
        }



        for(let i = 0, length = this.allPillars.length; i < length; i++) {
            let pillar = this.allPillars[i];
            pillar.node.position = cc.v2(pillar.node.position.x - dt * this.pillarSpeed, pillar.node.position.y);

            if (pillar.node.position.x < this.birdPosX && !pillar.isPassedBird) {
                pillar.setIsPassedBird(true);
                this.addScore();
            }

            if (pillar.node.position.x < (0 - (cc.director.getWinSize().width / 2 + (pillar.node.width / 2)))) {
                pillar.randomAltitude();
                pillar.node.position = cc.v2(cc.director.getWinSize().width + this.pillarWidth + pillar.node.position.x , pillar.node.position.y);
                pillar.setIsPassedBird(false);
            }
        }

        this.checkGameOver();

    }

    checkGameOver() {

        if ((this.bird.node.position.y < ((0 - cc.director.getWinSize().height / 2) + this.nodeLand.height)) || (this.bird.node.position.y > cc.director.getWinSize().height / 2)) {
            this.gameOver();
            return;
        }

        for(let i = 0, length = this.allPillars.length; i < length; i++) {
            let pillar = this.allPillars[i];
            if (pillar.checkCollion(this.bird)) {
                this.gameOver();
                break;
            }
        }

    }

    gameOver() {
        this.isPlaying = false;
        this.nodeGameOver.active = true;
        this.btnPlay.node.active = true;
    }

    onClickScreen() {
        if (this.isPlaying) {
            this.bird.flyUp();
        }
    }

    startGame() {
        this.isPlaying = true;
        this.nodeTutorial.active = false;
    }

    startPrepare() {
        this.resetBirdPosition();
        this.resetPillarsPosition();

        this.currentScore = 0;
        this.refreshScore();

        this.nodeGameOver.active = false;
        this.nodeTutorial.active = true;
        this.btnPlay.node.active = false;
    }

}
