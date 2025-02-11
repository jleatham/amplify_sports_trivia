import React from 'react';
/* Location 6 */
import { withAuthenticator } from 'aws-amplify-react';
import { Analytics, Auth } from 'aws-amplify';
import Game from '../Game';
import './styles/index.css';

const App = () => (
  <div className="app-container">
    <Game />
  </div>
);

/* Location 7 */
export default withAuthenticator(App, {includeGreetings: true});



