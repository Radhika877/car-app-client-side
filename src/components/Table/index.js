import { Dialog } from '@material-ui/core';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomerDialog from '../Dialog';

const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TableData({ setNoOfPages, searchString, currentPage }) {
  const classes = useStyles();
  const [ rowData, setRowData ] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ documentId, setDocumentId] = useState("");

  const fetchCarData = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/`, {
        params: {
          searchString: searchString,
          pageNo: currentPage,
        }
      });
      if(response.status === 200){
        const { result } = response.data;
        setRowData(result.hits);
        setNoOfPages(result.nbPages);
      }
    } catch(err){
      console.log('Error Occurred while fetching data ', err);
    }
  }

  useEffect(() => {
    fetchCarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchString, currentPage]);

  return (
    <>
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sales ID</StyledTableCell>
            <StyledTableCell align="center">Customer Id</StyledTableCell>
            <StyledTableCell align="center">Date of purchase</StyledTableCell>
            <StyledTableCell align="center">Fuel</StyledTableCell>
            <StyledTableCell align="center">Vehicle Segment</StyledTableCell>
            <StyledTableCell align="center">Air Bags</StyledTableCell>
            <StyledTableCell align="center">Selling Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, idx) => (
            <StyledTableRow key={idx} onClick={() => {setModalOpen(true); setDocumentId(row.objectID)}}>
              <StyledTableCell align="center">
                {row.salesId}
              </StyledTableCell>
              <StyledTableCell align="center">{row.customerId}</StyledTableCell>
              <StyledTableCell align="center">{row.dateOfPurchase}</StyledTableCell>
              <StyledTableCell align="center">{row.fuel}</StyledTableCell>
              <StyledTableCell align="center">{row.vehicleSegment}</StyledTableCell>
              <StyledTableCell align="center">{row.airBags}</StyledTableCell>
              <StyledTableCell align="center">{row.sellingPrice}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <CustomerDialog documentId={documentId} closeModal={() => setModalOpen(false)} />
    </Dialog>
    </>
  );
}
