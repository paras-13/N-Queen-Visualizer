let size = 0;
        let board = [];
        let delay = 500;
        let solutionsCount = 0;

        function startVisualization() {
            size = parseInt(document.getElementById('board-size').value);
            if (size < 4) {
                alert("Board size should be 4 or more");
                return;
            }
            board = new Array(size).fill().map(() => new Array(size).fill(0));
            solutionsCount = 0;
            document.getElementById('solution-count').innerText = `Total Solutions: ${solutionsCount}`;
            createChessboard();
            solveNQueens(0);
        }

        function createChessboard() {
            const chessboard = document.getElementById('chessboard');
            chessboard.innerHTML = '';
            
            for (let i = 0; i < size; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < size; j++) {
                    const cell = document.createElement('td');
                    cell.id = `cell-${i}-${j}`;
                    cell.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
                    row.appendChild(cell);
                }
                chessboard.appendChild(row);
            }
        }

        async function solveNQueens(col) {
            if (col >= size) {
                solutionsCount++;
                document.getElementById('solution-count').innerText = `Total Solutions: ${solutionsCount}`;
                await sleep(1000);  // Pause between displaying solutions
                return false;  // Continue finding other solutions
            }

            for (let i = 0; i < size; i++) {
                if (isSafe(i, col)) {
                    board[i][col] = 1;
                    updateChessboard();
                    await sleep(delay);

                    if (await solveNQueens(col + 1)) {
                        return true;
                    }

                    board[i][col] = 0; // Backtracking
                    updateChessboard();
                    await sleep(delay);
                }
            }
            return false;
        }

        function isSafe(row, col) {
            // Check same row on the left
            for (let i = 0; i < col; i++) {
                if (board[row][i] === 1) return false;
            }
            // Check upper diagonal on the left
            for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j] === 1) return false;
            }
            // Check lower diagonal on the left
            for (let i = row, j = col; j >= 0 && i < size; i++, j--) {
                if (board[i][j] === 1) return false;
            }
            return true;
        }

        function updateChessboard() {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const cell = document.getElementById(`cell-${i}-${j}`);
                    cell.innerHTML = board[i][j] === 1 ? '♛' : '';  // Place or remove the queen
                }
            }
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }