class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        let found = [];
        this.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    eat() {
        let found = this.chooseCell(1);
        let oneCell = random(found);
        if (oneCell) {
            this.energy += 4;
            let newX = oneCell[0];
            let newY = oneCell[1];
            for (let i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy > 20) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }
    move() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        if (oneCell) {
            let newX = oneCell[0];
            let newY = oneCell[1];
            this.energy--;
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if (this.energy <= 0) {
                this.die()
            }
        }
        else {
            this.energy--;
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        let found = this.chooseCell(0);
        let oneCell = random(found);
        if (oneCell) {
            let x = oneCell[0];
            let y = oneCell[1];
            matrix[y][x] = 2;
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            this.energy = 8;
        }
    }

}