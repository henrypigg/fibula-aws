import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nMessage: ${message}`);
    // You can replace the console.log with your desired submit logic
    const response = await fetch(
        "https://n7cb2loyv3.execute-api.us-east-1.amazonaws.com/prod/enroll",
        {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                email: email,
                organization: organization,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
    
    console.log(response)
  };

  return (
    <div>
        <h1>New User Enrollment Form</h1>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField type="text" onChange={(name) => setName(name.target.value)}></TextField>
            <FormLabel>Email</FormLabel>
            <TextField type="email" onChange={(email) => setEmail(email.target.value)}></TextField>
            <FormLabel>Organization</FormLabel>
            <TextField type="text" onChange={(organization) => setOrganization(organization.target.value)}></TextField>
            <FormLabel>Message</FormLabel>
            <TextField type="text" onChange={(message) => setMessage(message.target.value)}></TextField>
            <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
    </div>
  );
}

export default ContactForm;