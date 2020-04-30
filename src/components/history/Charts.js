import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
// import { chartHistory } from '../redux/actions/order';
import axios from 'axios';
import Navbar from '../layout/Navbar';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  getChart = () => {
    axios.get(`http://54.242.170.33/order/chart`).then((res) => {
      let dataChart = res.data.result;
      this.setState({
        Data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Rainfall',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,19cd 2,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 3,
              data: [1, 10, 5, dataChart],
            },
          ],
        },
      });
    });
  };
  onLogout() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('otoritas_id');
    this.props.history.push('/login');
  }
  componentDidMount = async () => {
    await this.getChart();
  };

  render() {
    return (
      <div>
        <Navbar onClick={this.onLogout.bind(this)} />
        <div className='chartHistory'>
          <Line
            data={this.state.Data}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log('ini chartsttea', state.order.chart)
  return {
    chart: state.order.chart,
  };
};
export default connect(mapStateToProps)(Charts);
