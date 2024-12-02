import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TableList = ({ rowNames, list, navigateType }) => {
  const getValuesWithoutId = list => {
    const { id, ...valuesWithoutId } = list;
    return Object.values(valuesWithoutId);
  };
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#e08e45' }}>
          <TableRow>
            {rowNames.map(row => (
              <TableCell key={uuidv4()}>
                <Typography variant="h6" sx={{ color: '#f9e2b2' }}>
                  {row + ':'}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: '#ebb582' }}>
          {list.map(row => (
            <TableRow
              onClick={() => navigate(`/${navigateType}/${row.id}`)}
              key={uuidv4()}
              sx={{ cursor: 'pointer' }}
            >
              {getValuesWithoutId(row).map(value => (
                <TableCell key={uuidv4()}>
                  {value ? value : '(absent)'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
