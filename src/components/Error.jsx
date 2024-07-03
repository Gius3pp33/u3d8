import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Error = ({ message }) => (
  <Alert variant="danger">
    {message ? message : 'Errore durante il recupero dei dati.'}
  </Alert>
);

export default Error;
