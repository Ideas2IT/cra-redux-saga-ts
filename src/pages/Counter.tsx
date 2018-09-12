import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { decrement, increment } from '../actions/counter/counter';
import { IState } from '../reducers';

interface IStateProps {
  count: number
}

interface IDispatchProps {
  increment: () => void
  decrement: () => void
}

const Counter = (props: RouteComponentProps<any> & IStateProps & IDispatchProps) => (
  <Grid spacing={8}     
    container={true} 
    direction="row"
    justify="center"
    alignItems="center">
    <Grid item={true} lg={4} container={true}
      direction="row"
      justify="space-between"
      alignItems="center">
      <Grid item={true} lg={2} xs={4}>
        <Button variant="fab" color="primary" aria-label="Add" onClick={props.increment}>
          <AddIcon />
        </Button>
      </Grid>
      <Grid item={true} lg={2} xs={4}>
        Counter: {props.count}
      </Grid>
      <Grid item={true} lg={2} xs={4}>
        <Button variant="fab" color="secondary" aria-label="Sub" onClick={props.decrement}>
          <RemoveIcon />
        </Button>
      </Grid>
    </Grid>
  </Grid>
)

const mapStateToProps = (state: IState) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch: any) => ({
  decrement: () => dispatch(decrement()),
  increment: () => dispatch(increment()),
})

export default connect<IStateProps, IDispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Counter)
