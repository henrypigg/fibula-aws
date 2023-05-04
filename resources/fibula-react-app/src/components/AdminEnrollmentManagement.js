import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function AdminEnrollmentManagement() {
    const [searchParams, setSearchParams] = useSearchParams();

    const email = searchParams.get('email');

    const handleApprove = () => {
        console.log('Approving enrollment request for ' + email);
    }

    const handleDeny = () => {
        console.log('Denying enrollment request for ' + email);
    }

    return (
        <div>
            <center>
                <h1>Admin Enrollment Management</h1>
                <p>Enrollment Request Email: {email}</p>
                <Button variant="contained" color="primary">Approve</Button>
                <Button variant="contained" color="secondary">Deny</Button>
            </center>
        </div>
    );
}

export default AdminEnrollmentManagement;
