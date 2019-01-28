import Exercise from "./Exercise";

export default class Workout {

    private _exercises: Exercise[];

    constructor(
        private readonly _date: Date,
        private readonly _note: string,
        private readonly _bodyWeight: number
    ) {
        this._exercises = [];
    }
    
    get date(): Date {
        return this._date;
    }

    get note(): string {
        return this._note;
    }

    get bodyWeight(): number {
        return this._bodyWeight;
    }

    get exercises(): Exercise[] {
        return this._exercises;
    }

    public AddExercise(exercise: Exercise): void {
        if (exercise.sets.length === 0) {
            return;
        }

        this._exercises.push(exercise);
    }
}
