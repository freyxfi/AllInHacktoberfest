const isSudokuSafe = (sudoku, row, col, dat) => {
    let data = parseInt(dat);
    for (let i = 0; i < 9; i++) {
        if ((i !== col && sudoku[row][i].value === data) || (i !== row && sudoku[i][col].value === data)) {
            return false;
        }
    }
    const m = Math.floor(row / 3) * 3;
    const n = Math.floor(col / 3) * 3;
    for (let i = m; i < m + 3; i++) {
        for (let j = n; j < n + 3; j++) {
            if (i !== row && j !== col && sudoku[i][j].value === data) {
                return false;
            }
        }
    }
    return true;
}

const SudokuSolve = (sudoku, row, col) => {
    if (row === 9 && col === 0) {
        return true;
    }
    let nextRow = row;
    let nextCol = col + 1;
    if (col + 1 === 9) {
        nextRow += 1;
        nextCol = 0;
    }
    if (sudoku[row][col].value !== 0) {
        const x = SudokuSolve(sudoku, nextRow, nextCol);
        // console.log(x,row,col);
        return x;
    }
    for (let val = 1; val <= 9; val++) {
        if (isSudokuSafe(sudoku, row, col, val)) {
            sudoku[row][col].value = val;
            sudoku[row][col].isInitial = 1;
            if (SudokuSolve(sudoku, nextRow, nextCol)) {
                return true;
            }
            sudoku[row][col].value = 0;
            sudoku[row][col].isInitial = 0;
        }
    }
    return false;
}

export { SudokuSolve, isSudokuSafe };