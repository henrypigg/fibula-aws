import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nMessage: ${message}`);
    // You can replace the console.log with your desired submit logic
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setOrganization('');
      setMessage('');
    }, 1000);
  };

  return (
    <div>
      <center>
        <h1>New Coder Enrollment Form</h1>
        <FormControl>
            {submitted && <p>Submitted!</p>}
            <FormLabel>Name</FormLabel>
            <TextField type="text" value={name} onChange={(name) => setName(name.target.value)}></TextField>
            <FormLabel>Email</FormLabel>
            <TextField type="email" value={email} onChange={(email) => setEmail(email.target.value)}></TextField>
            <FormLabel>Organization</FormLabel>
            <TextField type="text" value={organization} onChange={(organization) => setOrganization(organization.target.value)}></TextField>
            <FormLabel>Message</FormLabel>
            <TextField id="outlined-multiline-flexible" multiline maxRows={4} type="text" value={message} onChange={(message) => setMessage(message.target.value)}></TextField>
            <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
        </center>
    </div>
  );
}

export default ContactForm;