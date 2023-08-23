import React, { useEffect, useState } from 'react';
import initKeycloak from './keycloak';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const keycloakInstance =  initKeycloak();
    keycloakInstance
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setKeycloak(keycloakInstance);
        setAuthenticated(authenticated);
      })
      .catch((error) => console.error('Keycloak init error:', error));
  }, []);

  if (!keycloak) {
    return <div>Loading Keycloak...</div>;
  }

  const students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    // ... Add more students
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h1>Student Dashboard</h1>
      {students.slice(startIndex, endIndex).map((student) => (
        <Card key={student.id} className="mb-3">
          <Card.Body>{student.name}</Card.Body>
        </Card>
      ))}
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default App;
