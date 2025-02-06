import React, { useState } from "react";
import BoardUI from "./BoardUI";

export type Ball = {
    id: number;
    path: number[];
};

// map of multipliers depending on number of rows
const row_multipliers: Map<number, number[]> = new Map([
    [10, [10, 3.4, 1.8, 0.9, 0.5, 0.2, 0.5, 0.9, 1.8, 3.4, 10]],
    [12, [25, 8.8, 4.4, 0.9, 0.5, 0.2, 0.1, 0.2, 0.5, 0.9, 4.4, 8.8, 25]],
    [14, [500, 200, 50, 25, 3.6, 0.6, 0.2, 0.1, 0.2, 0.6, 3.6, 25, 50, 200, 500]],
]);

const Game: React.FC = () => {
    // initialise current state and update fns
    const [balls, setBalls] = useState<Ball[]>([]);
    const [points, setPoints] = useState<number>(parseFloat(localStorage.getItem("wallet") || "100"));
    const [ballValue, setBallValue] = useState<number>(parseInt(localStorage.getItem("ballValue") || "1"));
    const [rows, setRows] = useState<number>(parseInt(localStorage.getItem("rows") || "10"));
    const [multipliers, setMultis] = useState<number[]>(row_multipliers.get(rows)!);
    const [columns, setColumns] = useState<number>(2 * rows - 1);

    // change the number of rows, and correspondingly the multipliers and columns
    // also clear balls on current board
    const changeRow = (nRows: number): void => {
        setRows(nRows);
        // through frontend UI, guaranteed to be 10, 12 or 14
        setMultis(row_multipliers.get(nRows)!);
        setColumns(2 * nRows - 1);
        // clear balls in motion
        setBalls([]);
        localStorage.setItem("rows", nRows.toString());
    }

    // wrapper around setBallValue that also sets ballValue in storage for persistance
    const changeBallValue = (newVal: number): void => {
        setBallValue(newVal);
        localStorage.setItem("ballValue", newVal.toString());
    }
    
    // wrapper around setWallet that also sets wallet in storage for persistance
    const updatePoints = (amount: number): void => {
        setPoints(amount);
        localStorage.setItem("wallet", amount.toString());
    }
    
    // generates and returns a random path from top peg to multiplier bucket
    const generatePath = (): number[] => {
        // start in middle
        let mid = Math.ceil(columns/2);
        let pos = mid;
        const path: number[] = [pos];

        // at every level, go left or right
        for (let i = 0; i < rows; i++) {
            // skew probabilities depending on position relative to middle
            pos += Math.random() < (0.5 + (mid - pos)/(rows * 15)) ? 1: -1;
            path.push(pos);
        }
        return path;
    }

    // drops a ball down a path and return true if sufficient funds, else return false
    const dropBall = (): boolean => {
        if (points < ballValue) {
            return false;
        }

        updatePoints(points - ballValue);
        const id = Math.random();
        const path = generatePath();
        setBalls((prev) => [...prev, { id, path }]);
        return true;
    }

    // once a ball reaches a bucket and stops, calculate winnings and add to wallet
    const onBallStop = (ball: Ball): void => {
        const endSound: HTMLAudioElement = new Audio("../../bing.mp3");
        endSound.playbackRate = 2.0;
        endSound.play();

        // multis are between pegs, and before and after first and last,
        // so division by 2 is always a valid index
        const result: number = ball.path[ball.path.length - 1] / 2;
        const winnings: number = ballValue * multipliers[result % multipliers.length];

        setBalls((remBalls) => remBalls.filter((b) => b.id !== ball.id));
        updatePoints(points + winnings);
    }

    return (
        <BoardUI
            points={points}
            setPoints={updatePoints}
            ballValue={ballValue}
            setBallValue={changeBallValue}
            balls={balls}
            dropBall={dropBall}
            onBallStop={onBallStop}
            rows={rows}
            setRows={changeRow}
            columns={columns}
            multipliers={multipliers}
        />
    );
}

export default Game;