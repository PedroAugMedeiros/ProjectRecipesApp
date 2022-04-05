import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  const handleClicLogout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header pageTitle="Perfil" />
      <div className="d-flex flex-column align-items-center p-4">
        <h2 className="mb-4 mt-4" data-testid="profile-email">{ email }</h2>
        <Button
          className="w-75 mb-2"
          size="lg"
          variant="secondary"
          data-testid="profile-logout-btn"
          onClick={ handleClicLogout }
        >
          Sair
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
