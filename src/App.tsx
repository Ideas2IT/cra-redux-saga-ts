import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import routes from './routes';
import WithRoot from './WithRoot';

interface IAppProps {
  history: History;
}

const App = ({ history }: IAppProps) => {
  return (
    <WithRoot>
      <ConnectedRouter history={history}>
        { routes }
      </ConnectedRouter>
    </WithRoot>
  );
};

export default App;
