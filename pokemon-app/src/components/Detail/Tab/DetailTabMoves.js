import React, { useState } from "react";
import usePagination from "../../../providers/pokemon/pagination";
import { Pagination } from "@material-ui/lab";
import { startEndNumberList } from "../../../service/util";
import { letterCapitalize } from "../../../service/util";

import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 500,
  },
  headerTableRow: {
    backgroundColor: "#0A285F",

    "& th": {
      color: "white",
      fontWeight: "bold",
    },
  },
  paginationMoves: {
    padding: "35px 0 10px",
  },
  paginationInfo: {
    padding: "0 0 10px"
  }
}));

function DetailTabMoves({ moves }) {
  const classes = useStyles();
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);
  const currentStartEndNumberList = startEndNumberList(page, PAGE_SIZE);
  const totalPage = Math.ceil(moves.length / PAGE_SIZE);
  const dataCollection = usePagination(moves, PAGE_SIZE, totalPage);

  const handleChangePage = (event, val) => {
    setPage(val);
    dataCollection.jump(val);
  };

  return (
    <div className={classes.table}>
      <Typography variant="body1" color="secondary" className={classes.paginationInfo}>
        {`Show ${currentStartEndNumberList.start}-${
          currentStartEndNumberList.end > moves.length
            ? moves.length
            : currentStartEndNumberList.end
        } from ${moves.length} Moves`}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.headerTableRow}>
              <TableCell>Move Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCollection.currentData().map((row, idx) => (
              <TableRow key={`${idx}-${row.move.name}`}>
                <TableCell component="th" scope="row">
                  {letterCapitalize(row.move.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className={classes.paginationMoves}
        color="secondary"
        count={totalPage}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default DetailTabMoves;
