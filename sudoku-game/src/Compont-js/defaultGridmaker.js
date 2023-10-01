const dgridMaker = () => {
    const dgrid = [];
    for (let row = 0; row < 9; row++) {
      dgrid[row] = [];
      for (let col = 0; col < 9; col++) {
        const cellValue = 0;
        const isInitial = 0;
  
        dgrid[row][col] = {
          value: cellValue,
          isInitial: isInitial,
        };
      }
    }
    return dgrid;
  }

  export default dgridMaker;