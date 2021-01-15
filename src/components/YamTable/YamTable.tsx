import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

interface TableOptions {
  columns?: Array<any>;
  rows?: Array<any>;
}

const YamTable: React.FC<TableOptions> = ({ columns, rows }) => {
  return (
    <>
      <Paper className="w-full rounded-8 shadow-1">
        <div className="table-responsive">
          <Table className="w-full min-w-full">
            <TableHead>
              <TableRow>
                {columns &&
                  columns.map((column) => (
                    <TableCell key={column.id} className="whitespace-no-wrap">
                      {column.title}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell: any) => {
                      switch (cell.id) {
                        case "budget_type": {
                          return (
                            <TableCell key={cell.id} component="th" scope="row">
                              <Typography className={clsx(cell.classes, "inline text-11 font-500 px-8 py-4 rounded-4")}>{cell.value}</Typography>
                            </TableCell>
                          );
                        }
                        case "spent_perc": {
                          return (
                            <TableCell key={cell.id} component="th" scope="row">
                              <Typography className={clsx(cell.classes, "flex items-center")}>
                                {cell.value}
                                <Icon className="text-14 mx-4">{cell.icon}</Icon>
                              </Typography>
                            </TableCell>
                          );
                        }
                        default: {
                          return (
                            <TableCell key={cell.id} component="th" scope="row">
                              <Typography className={cell.classes}>{cell.value}</Typography>
                            </TableCell>
                          );
                        }
                      }
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
};

export default YamTable;
