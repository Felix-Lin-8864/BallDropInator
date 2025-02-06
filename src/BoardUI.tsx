import React, { useState } from "react";
import { motion } from "framer-motion";
import { Ball } from "./Game";
import "./GameStyles.css";

// spacing between pegs
const PEG_GAP: number = 20;

type GameBoard = {
    points: number;
    setPoints: (value: number) => void;
    ballValue: number;
    setBallValue: (value: number) => void;
    balls: Ball[];
    dropBall: () => boolean;
    onBallStop: (ball: Ball) => void;
    rows: number;
    setRows: (nRows: number) => void;
    columns: number;
    multipliers: number[];
}

// calculate the horizontal coords of all pegs and multipliers
function boardCoords(rows: number): number[][] {
    const res = [[Math.ceil((2 * rows - 1) / 2)]];

    for (let i = 1; i <= rows; i++) {
        const next: number[] = [res[i - 1][0] - 1];
        for (let j = 0; j < i; j++) {
            next.push(res[i - 1][j] + 1);
        }
        res.push(next);
    }

    return res;
} 

const BoardUI: React.FC<GameBoard> = ({
    points,
    setPoints,
    ballValue,
    setBallValue,
    balls,
    dropBall,
    onBallStop,
    rows,
    setRows,
    columns,
    multipliers,
}) => {
    const mid: number = Math.ceil(columns/2);
    const pegCoords: number[][] = boardCoords(rows);
    // boardCoords never returns empty array, so pop() won't return undefined
    const multiCoords: number[] = pegCoords.pop()!;

    const [bvInputVal, setBvInputVal] = useState<string>(ballValue.toString());
    const [warn, setWarn] = useState<boolean>(false);
    const onBallDrop = (): void => {
        // if insufficient funds to drop ball
        if (!dropBall()) {
            setWarn(true);
            setTimeout(() => setWarn(false), 2000);
        }
    }

    return (
        <div className="board-container">
            <div className="controls">
                <h2 className={warn ? "points-warn" : ""}>
                    Points: {points.toFixed(2)}
                </h2>
                <div style={{ justifyContent: "center" }}>
                    <label style={{ fontSize: "large" }}>
                        Ball Value:{" "}
                        <input
                            type="number"
                            value={bvInputVal}
                            onChange={(e) => {
                                setBvInputVal(e.target.value);
                                const val = parseInt(bvInputVal);
                                if (!isNaN(val)) {
                                    setBallValue(val);
                                }
                            }}
                            onBlur={() => {
                                const val = parseInt(bvInputVal);
                                if (isNaN(val) || val < 1) {
                                    setBallValue(1);
                                    setBvInputVal("1");
                                }
                            }}
                        ></input>
                    </label>

                    <label style={{ fontSize: "large" }}>
                        Rows:{" "}
                        <select
                            value={rows}
                            onChange={(e) => setRows(parseInt(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={12}>12</option>
                            <option value={14}>14</option>
                        </select>
                    </label>
                </div>
                

                <div id="button-container">
                    <button id="top-up" onClick={() => setPoints(points + 100)}>Top Up 100pts</button>
                    <button id="drop-ball" onClick={onBallDrop}>Drop Ball</button>
                </div>
            </div>

            <div className="board">
                <div>
                    {/* Plinko Peg Board */}
                    {pegCoords.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((offset, colIndex) => {
                                return (
                                    <div
                                        key={colIndex}
                                        className="peg"
                                        style={{
                                            left: (offset - mid) * PEG_GAP,
                                            top: rowIndex * PEG_GAP,
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}

                    {/* Ball visual + animation */}
                    {balls.map((ball) => (
                        <motion.div
                            key={ball.id}
                            className="ball"
                            initial={{
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                x: ball.path.map((pos) => (pos - mid) * PEG_GAP), // pos for horizontal
                                y: ball.path.map((_, i) => i * PEG_GAP), // index for vertical
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: Array.from({ length: ball.path.length }, (_, i) => i / ball.path.length),
                            }}
                            onAnimationComplete={() => onBallStop(ball)}
                        />
                    ))}

                    {/* Multiplier buckets */}
                    <div
                        className="row multipliers"
                        style={{
                            top: pegCoords.length * PEG_GAP,
                        }}
                    >
                        {multipliers.map((multi, col) => (
                            <div
                            key={col}
                            className="multi"
                            style={{
                                width: PEG_GAP,
                                left: (multiCoords[col] - mid - 0.7) * PEG_GAP, // - 0.7 to center box
                            }}
                            >
                                {multi}x
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardUI;