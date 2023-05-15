import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function AdminEnrollmentManagement() {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const email = searchParams.get('email');

    const handleApprove = (row) => {
        console.log(data)
        console.log('Approving enrollment request for ' + row.email);
    }

    const handleDeny = (row) => {
        console.log('Denying enrollment request for ' + row.email);
    }

    const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
        const [isExpanded, setIsExpanded] = React.useState(false);
      
        return (
          <>
            <TableRow {...otherProps}>
              <TableCell padding="checkbox">
                <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              {children}
            </TableRow>
            {isExpanded && (
              <TableRow>
                <TableCell padding="checkbox" />
                {expandComponent}
              </TableRow>
            )}
          </>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://vgyc6fujod.execute-api.us-east-1.amazonaws.com/prod/enroll")
            .then((response) => response.json())
            .then((data) => setData(data))
        }

        fetchData()
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <center>
                <h1>Admin Enrollment Management</h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Date Created</TableCell>
                        <TableCell align="right">Approve</TableCell>
                        <TableCell align="right">Deny</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <ExpandableTableRow
                        key={row.requestid}
                        expandComponent={<TableCell colSpan="5">{row.message}</TableCell>}
                        >
                            <TableCell align="right">{row.lastName}, {row.firstName}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right">{row.enrollmentstatus}</TableCell>
                            <TableCell align="right">{row.dateCreated}</TableCell>
                            <TableCell align="right"><Button variant="contained" color="primary" onClick={() => handleApprove(row)}>Approve</Button></TableCell>
                            <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleDeny(row)}>Deny</Button></TableCell>
                        </ExpandableTableRow>
                    ))}
                    </TableBody>
                </Table>
            </center>
        </div>
    );
}

export default AdminEnrollmentManagement;
