import { render, screen } from '@testing-library/react';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min"

test('renders learn react link', () => {
  render(
  <App />);
  
});
