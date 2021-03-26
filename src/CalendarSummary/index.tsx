import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Day from './day';
import TotalSummary from './totalSummary';
import convertEvents from './convertEvents';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCellTotal = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
    fontWeight: 'bold',
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CalendarSummary: React.FunctionComponent = () => {
  const classes = useStyles();
  const [days, setDays] = useState(new Array<Day>());
  const [total, setTotal] = useState<TotalSummary>();

  useEffect(() => {
    convertEvents(setTotal, setDays);
  }, []);

  if (!days.length || !total) {
    return <CircularProgress style={{marginLeft: '50%', marginTop: '50%'}} />;
  }

  return (
    <React.Fragment>
      <h1>Calendar Summary</h1>
      <TableContainer component={Paper} style={{marginTop: '10%'}}>
        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Number of events</StyledTableCell>
              <StyledTableCell align="right">
                Total duration [min]
              </StyledTableCell>
              <StyledTableCell align="right">Longest event</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <StyledTableRow key={day.currentDate}>
                <StyledTableCell align="right">
                  {day.currentDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {day.eventsNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {day.totalEventsDuration}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {day.longestEventTitle}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCellTotal align="right">Total</StyledTableCellTotal>
              <StyledTableCellTotal align="right">
                {total.weekTotalEvents}
              </StyledTableCellTotal>
              <StyledTableCellTotal align="right">
                {total.weekTotalDuration}
              </StyledTableCellTotal>
              <StyledTableCellTotal align="right">
                {total.weekLongestName}
              </StyledTableCellTotal>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default CalendarSummary;
