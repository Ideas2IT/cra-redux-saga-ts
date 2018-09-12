import * as React from 'react'
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';

interface IProps extends LocalizeContextProps {
  value: string
}
class Hello extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { activeLanguage, value } = this.props;
    return (
      <div>
        {value ? value: "Parent"}<br/>
        <h3>Active Language is {activeLanguage? activeLanguage.name : ''}</h3>
        <h1><Translate id="greeting" data={{ name: 'App Name' }} /></h1>
        </div>
    )
  }

}

export default withLocalize(Hello);