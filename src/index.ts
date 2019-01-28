import CsvParser from "csv-parser";
import fs from "fs";
import moment from "moment";
import util from "util";

import IRawInputRow from "./models/IRawInputRow";
import Workout from "./models/Workout";
import Exercise from "./models/Exercise";

class StrongliftsParser {
    private static readonly columnNames = ["date", "note", "bodyWeightKg", "bodyWeightLb", "ex1_Name", "ex1_WeightKg", "ex1_WeightLb", "ex1_Set1", "ex1_Set2", "ex1_Set3", "ex1_Set4", "ex1_Set5", "ex2_Name", "ex2_WeightKg", "ex2_WeightLb", "ex2_Set1", "ex2_Set2", "ex2_Set3", "ex2_Set4", "ex2_Set5", "ex3_Name", "ex3_WeightKg", "ex3_WeightLb", "ex3_Set1", "ex3_Set2", "ex3_Set3", "ex3_Set4", "ex3_Set5", "ex4_Name", "ex4_WeightKg", "ex4_WeightLb", "ex4_Set1", "ex4_Set2", "ex4_Set3", "ex4_Set4", "ex4_Set5"];
    private readonly _rawData: IRawInputRow[] = [];

    public Parse(): void {
        this.ReadData("./data/spreadsheet-stronglifts.csv");
    }

    private ReadData(filePath: string): void {
        fs.createReadStream(filePath)
            .pipe(CsvParser({
                mapHeaders: ({ header, index }) => StrongliftsParser.columnNames[index],
                skipLines: 1
            }))
            .on("data", (data) => this._rawData.push(data as IRawInputRow))
            .on("end", () => {
                this.ConvertToModel();
            });
    }

    private ConvertToModel(): void {
        for (let row of this._rawData)
        {
            //console.log(row);
            const date = moment(row.date, "DD-MM-YY");
            const bodyWeight = Number(row.bodyWeightKg);

            const workout = new Workout(date.toDate(), row.note, bodyWeight);

            (row.ex1_Name !== "") && workout.AddExercise(this.ParseExercise(
                row.ex1_Name,
                row.ex1_WeightKg,
                row.ex1_Set1,
                row.ex1_Set2,
                row.ex1_Set3,
                row.ex1_Set4,
                row.ex1_Set5));
            
            (row.ex2_Name !== "") && workout.AddExercise(this.ParseExercise(
                row.ex2_Name,
                row.ex2_WeightKg,
                row.ex2_Set1,
                row.ex2_Set2,
                row.ex2_Set3,
                row.ex2_Set4,
                row.ex2_Set5));

            (row.ex3_Name !== "") && workout.AddExercise(this.ParseExercise(
                row.ex3_Name,
                row.ex3_WeightKg,
                row.ex3_Set1,
                row.ex3_Set2,
                row.ex3_Set3,
                row.ex3_Set4,
                row.ex3_Set5));

            (row.ex4_Name !== "") && workout.AddExercise(this.ParseExercise(
                row.ex4_Name,
                row.ex4_WeightKg,
                row.ex4_Set1,
                row.ex4_Set2,
                row.ex4_Set3,
                row.ex4_Set4,
                row.ex4_Set5));
            
            console.log(util.inspect(workout, { depth: null }));
        }
    }

    private ParseExercise(
        name: string,
        weight: string,
        set1: string,
        set2: string,
        set3: string,
        set4: string,
        set5: string
    ): Exercise {
        const exercise = new Exercise(name, Number(weight));
        (Number(set1) || 0 !== 0) && exercise.AddSet(Number(set1));
        (Number(set2) || 0 !== 0) && exercise.AddSet(Number(set2));
        (Number(set3) || 0 !== 0) && exercise.AddSet(Number(set3));
        (Number(set4) || 0 !== 0) && exercise.AddSet(Number(set4));
        (Number(set5) || 0 !== 0) && exercise.AddSet(Number(set5));
        return exercise;
    }
}

const parser = new StrongliftsParser();
parser.Parse();
