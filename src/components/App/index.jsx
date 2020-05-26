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



//added analytics
Analytics.autoTrack('session', {
    enable: true,
    provider: 'AWSPinpoint'
});

Analytics.autoTrack('pageView', {
    enable: true,
    eventName: 'pageView',
    type: 'SPA',
    provider: 'AWSPinpoint',
    getUrl: () => {
        return window.location.origin + window.location.pathname;
    }
});

const mappedobjects = f => obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const Arrayofourstrings = value => [`${value}`];
const mapArrayofourstrings = mappedobjects(Arrayofourstrings);

async function trackUserIdforPinpoint() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapArrayofourstrings(attributes);
    Analytics.updateEndpoint({
      address: attributes.email,      
      channelType: 'EMAIL',      
      optOut: 'NONE',      
      userId: attributes.sub,      
      userAttributes,    
    });
  } 

trackUserIdforPinpoint();