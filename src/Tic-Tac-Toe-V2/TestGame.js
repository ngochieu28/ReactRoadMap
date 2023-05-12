import React, { useState } from 'react';
import './TestGame.css'

function TestGame() {
    const [boardSize, setBoardSize] = useState({ rows: 3, cols: 3 });
    const [board, setBoard] = useState(Array(boardSize.rows).fill().map(() => Array(boardSize.cols).fill(null)));
    const [history, setHistory] = useState([{ squares: Array(boardSize.rows * boardSize.cols).fill(null), position: null }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winningSquares, setWinningSquares] = useState([]);
    const [isAscending, setIsAscending] = useState(true);

    function handleBoardSizeChange(event) {
        event.preventDefault();
        console.log(event);
        console.log(typeof event.target.elements.rows.value);
        const newBoardSize = { rows: parseInt(event.target.elements.rows.value), cols: parseInt(event.target.elements.cols.value) };
        setBoardSize(newBoardSize);
        setBoard(Array(newBoardSize.rows).fill(null).map(() => Array(newBoardSize.cols).fill(null)));
        setHistory([{ squares: Array(newBoardSize.rows * newBoardSize.cols).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true);
        setGameOver(false);
        setWinningSquares([]);

    }

    function calculateWinner(squares) {
        const lines = [];
        if (boardSize.rows >= 6 && boardSize.cols >= 6) {
            var winLength = 5;
        } else if (boardSize.rows <= 5 && boardSize.cols <= 5 && boardSize.rows > 3 && boardSize.cols > 3) {
            var winLength = 4;
        } else {
            var winLength = 3;
        }
        console.log(winLength);

        for (let i = 0; i < boardSize.rows; i++) {
            for (let j = 0; j < boardSize.cols; j++) {
                if (i + winLength - 1 < boardSize.rows) {
                    lines.push(new Array(winLength).fill().map((_, index) => (i + index) * boardSize.cols + j));
                }
                if (j + winLength - 1 < boardSize.cols) {
                    lines.push(new Array(winLength).fill().map((_, index) => i * boardSize.cols + j + index));
                }
                if (i + winLength - 1 < boardSize.rows && j + winLength - 1 < boardSize.cols) {
                    lines.push(new Array(winLength).fill().map((_, index) => (i + index) * boardSize.cols + j + index));
                }
                if (i + winLength - 1 < boardSize.rows && j - winLength + 1 >= 0) {
                    lines.push(new Array(winLength).fill().map((_, index) => (i + index) * boardSize.cols + j - index));
                }
            }
        }
        console.log(lines);

        if (boardSize.rows >= 6 && boardSize.cols >= 6) {
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c, d, e] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
                    return { player: squares[a], line: [a, b, c, d, e] };
                }
            }

        } else if (boardSize.rows <= 5 && boardSize.cols <= 5 && boardSize.rows > 3 && boardSize.cols > 3) {
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c, d] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
                    return { player: squares[a], line: [a, b, c, d] };
                }
            }
        } else {
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return { player: squares[a], line: [a, b, c] };
                }
            }
        }
    }

    function handleClick(row, col) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = [...current.squares];

        if (squares[row * boardSize.cols + col] || gameOver) {
            return;
        }

        squares[row * boardSize.cols + col] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat({ squares, position: `(${col}, ${row})` }));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
        const winner = calculateWinner(squares);
        if (winner) {
            setGameOver(true);
            setWinningSquares(winner.line);
        } else {
            setWinningSquares([]);
        }
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
        setWinningSquares([]);
        if (gameOver) {
            setGameOver(false);
            setWinningSquares([]);
        }
    }

    function toggleReverse() {
        setIsAscending(!isAscending);
    }



    function renderBoardSizeForm() {
        return (
            <form onSubmit={handleBoardSizeChange}>
                <label htmlFor="rows">Rows:</label>
                <input type="number" id="rows" name="rows" min="3" max="20" defaultValue={boardSize.rows} style={{ width: "50px" }} />
                &nbsp; &nbsp;
                <label htmlFor="cols">Cols:</label>
                <input type="number" id="cols" name="cols" min="3" max="20" defaultValue={boardSize.cols} style={{ width: "50px" }} />
                <br></br>
                <button type="submit" style={{ margin: "5px" }}>Start</button>
            </form>
        );
    }

    function renderBoard() {
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        const status = winner ? `Winner: ${winner.player}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
        console.log("current", current);
        return (
            <div className='board-container'>
                <div>{status}</div>
                <div>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((_, colIndex) => {
                                const index = rowIndex * boardSize.cols + colIndex;
                                const isWinningSquare = winningSquares.includes(index);
                                return (
                                    <div key={colIndex} onClick={() => handleClick(rowIndex, colIndex)} className={`square ${isWinningSquare ? 'winning' : ''}`}>
                                        {current.squares[index]}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function renderHistory() {
        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move} ${step.position}` :
                'Go to game start';
            return { move, desc };
        });

        if (!isAscending) {
            moves.reverse();
        }

        return (
            <div className='history-container'>
                <div className='sort-toggle'>
                    <button onClick={toggleReverse} className='history-button'>
                        Reverse
                    </button>
                </div>
                <ul style={{ padding: 0 }}>
                    {moves.map(({ move, desc }) => {
                        console.log("moves", moves);
                        const isCurrentStep = move === stepNumber;
                        return (
                            <li key={move}>
                                <button className='history-button'
                                    onClick={() => jumpTo(move)}
                                    style={{ fontWeight: isCurrentStep ? 'bold' : 'normal' }}>
                                    {desc}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className='row'>
            <div className='setup col-3'>
                {renderBoardSizeForm()}
            </div>
            <div className='col-6'>
                {renderBoard()}
            </div>
            <div className='col-3'>
                {renderHistory()}
            </div>
        </div>
    );
}

export default TestGame;