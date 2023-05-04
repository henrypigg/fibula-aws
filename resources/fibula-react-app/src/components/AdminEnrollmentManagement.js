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
            <h1>Admin Enrollment Management</h1>
            <p>Enrollment Request email: {email}</p>
            <Button variant="contained" color="primary">Approve</Button>
            <Button variant="contained" color="secondary">Deny</Button>
        </div>
    );
}

export default AdminEnrollmentManagement;
