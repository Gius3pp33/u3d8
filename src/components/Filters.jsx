import React from 'react';
import { Dropdown, Button, Form } from 'react-bootstrap';

const Filters = () => {
  return (
    <section className="container-fluid mt-4">
      <div className="d-flex container-fluid gx-1 align-items-center">
        <h2 className="text-white shows px-0 section-title me-3">Tv Shows</h2>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className="bg-dark">
            Genres
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Comedy</Dropdown.Item>
            <Dropdown.Item href="#">Horror</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form className="d-flex ms-auto ">
          <Button variant="link" className="text-secondary border-secondary rounded-0 " aria-label="Toggle View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="grey"
              className="bi bi-list "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </Button>
          <Button variant="link" className="text-white border-secondary rounded-0 " aria-label="More Options">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="grey"
              className="bi bi-three-dots "
              viewBox="0 0 16 16"
            >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
              />
            </svg>
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Filters;
