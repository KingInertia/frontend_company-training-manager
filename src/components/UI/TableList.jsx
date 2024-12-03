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

const TableList = ({
  rowNames,
  list,
  navigateType,
  onClick,
  headTextSize = 'h6',
}) => {
  const getValuesWithoutId = list => {
    const { id, ...valuesWithoutId } = list;
    return Object.values(valuesWithoutId);
  };
  const navigate = useNavigate();

  const handleOnClick = id => {
    if (navigateType) {
      navigate(`/${navigateType}/${id}`);
    } else if (onClick) {
      onClick(id);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: '#e08e45',
            '& th': {
              borderBottom: 'none',
            },
          }}
        >
          <TableRow>
            {rowNames.map(row => (
              <TableCell key={uuidv4()}>
                <Typography variant={headTextSize} sx={{ color: '#f9e2b2' }}>
                  {row + ':'}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            backgroundColor: '#ebb582',
            '& .MuiTableRow-root': {
              borderBottom: '2px solid #e5ab6c',
            },
          }}
        >
          {list.map(row => (
            <TableRow
              onClick={() => handleOnClick(row.id)}
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
