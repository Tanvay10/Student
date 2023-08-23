import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth', // Correct property name
  realm: 'Test',
  clientId: 'React'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
