export class Score {
    previousSessionScore: number = 0;
    currentSessionScore: number = 0;

    constructor(previousSessionScore?: number, currentSessionScore?: number) {
        if (previousSessionScore) this.previousSessionScore = previousSessionScore;
        if (currentSessionScore) this.currentSessionScore = currentSessionScore;
    }

    reset() {
        this.previousSessionScore = 0;
        this.currentSessionScore = 0;
    }

    incrementCurrentSessionScore() {
        this.currentSessionScore++;
    }

}
