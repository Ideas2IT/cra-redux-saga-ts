import * as React from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';

interface IProps extends LocalizeContextProps {
  value: string
}

const Home = ({ activeLanguage }: IProps) => (
  <div>
    Home
    <h3>Active Language is {activeLanguage ? activeLanguage.name : ''}</h3>
    <h1><Translate id="greeting" data={{ name: 'App Name' }} /></h1>
  </div>
);

export default withLocalize(Home);
