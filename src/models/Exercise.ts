export default class Exercise {
    private readonly _sets: number[];

    constructor(
        private _name: string,
        private _weight: number
    ) {
        this._sets = [];
    }

    get name(): string {
        return this._name;
    }

    get weight(): number {
        return this._weight;
    }

    get sets(): number[] {
        return this._sets;
    }

    get isSuccessful(): boolean {
        return this._sets.every(v => v === 5);
    }

    public AddSet(reps: number): void {
        if (reps <= 0) {
            return;
        }

        this._sets.push(reps);
    }

}
