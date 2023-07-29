import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Metronome from './Metronome/Metronome.js';
import Tuner from './Tuner/Tuner.js';
import ReferenceTrack from './ReferenceTrack/ReferenceTrack.js';

const App = () => {
  return (
    <Router>
      <Container>
        <h1>Musician's Web Tools</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/metronome" element={<MetronomePage />} />
          <Route path="/tuner" element={<TunerPage />} />
          <Route path="/referencetrack" element={<ReferenceTrackPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

const HomePage = () => (
  <>
    <Home />
    <Description>
      This is a one-stop website for all your musician needs! We have a metronome that includes beat subdivision, and don't forget to try our instrument tuner!
    </Description>
  </>
);

const MetronomePage = () => (
  <Metronome />
);

const TunerPage = () => (
  <Tuner />
);

const ReferenceTrackPage = () => (
  <ReferenceTrack />
);

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #525252;
  text-align: center;
  background-color: #e3f2fd;
  padding: 10px;
`;

const Navigation = () => {
  const location = useLocation();

  if (location.pathname === '/metronome') {
    return (
      <NavContainer>
        <NavLink onClick={() => window.location.href = '/'}>Home</NavLink>
      </NavContainer>
    );
  } else if (location.pathname === '/tuner') {
    return (
      <NavContainer>
        <NavLink onClick={() => window.location.href = '/'}>Home</NavLink>
      </NavContainer>
    );
  } else if (location.pathname === '/referencetrack') {
    return (
      <NavContainer>
        <NavLink onClick={() => window.location.href = '/'}>Home</NavLink>
      </NavContainer>
    );
  }

  return (
    <NavContainer>
      <NavLink onClick={() => window.location.href = '/metronome'}>Metronome</NavLink>
      <NavLink onClick={() => window.location.href = '/tuner'}>Tuner</NavLink>
      <NavLink onClick={() => window.location.href = '/referencetrack'}>Reference Track</NavLink>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  margin-bottom: 20px;
`;

const NavLink = styled.button`
  margin-right: 10px;
  background: #2339e9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background: #374ae7;
  }
`;

const Home = () => {
  return <h2>Welcome to the home page!</h2>;
};

const Description = styled.p`
  margin-top: 20px;
`;

export default App;

