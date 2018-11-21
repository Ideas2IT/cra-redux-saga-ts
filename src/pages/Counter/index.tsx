import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { decrement, decrementAsync, increment, incrementAsync } from '../../actions/counter/counter';
import { IState } from '../../reducers';

interface IStateProps {
  count: number,
  isLoading: boolean
}

interface IDispatchProps {
  decrement: () => void,
  decrementAsync: () => void,
  increment: () => void,
  incrementAsync: () => void,
}

const Counter = (props: RouteComponentProps<any> & IStateProps & IDispatchProps) => (
  <div className="container justify-content-center align-items-center">
    <div className="row justify-content-around align-items-center">
      <div className="col-sm-4 col-lg-2 align-items-center justify-content-between">
        <button className="btn btn-outline-primary mb-2" aria-label="Sub" onClick={props.decrement} disabled={props.isLoading}>
          Decrement
        </button>
        <button className="btn btn-outline-primary" aria-label="Sub" onClick={props.decrementAsync} disabled={props.isLoading}>
          Decrement Async
        </button>
      </div>
      <div className="col-sm-4 col-lg-2 align-items-center justify-content-between">
        <div>Counter: {props.count}</div>
      </div>
      <div className="col-sm-4 col-lg-2 align-items-center justify-content-between">
        <button className="btn btn-outline-primary mb-2" aria-label="Add" onClick={props.increment} disabled={props.isLoading}>
          Increment
        </button>
        <button className="btn btn-outline-primary" aria-label="Add" onClick={props.incrementAsync} disabled={props.isLoading}>
          Increment Async
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: IState) => ({
  count: state.counter.count,
  isLoading: state.counter.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  decrement: () => dispatch(decrement()),
  decrementAsync: () => dispatch(decrementAsync()),
  increment: () => dispatch(increment()),
  incrementAsync: () => dispatch(incrementAsync())
});

export default connect<IStateProps, IDispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Counter);
