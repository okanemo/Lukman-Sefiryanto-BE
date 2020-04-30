import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailProducts } from '../redux/actions/product';
import { withRouter } from 'react-router-dom'
class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            product: '',
            page: ''
        }
    }
    paginateProducts = (event) => {
        this.props.history.push(`?category=${this.state.category}&name=${this.state.product}&pages${event.target.id}`)
        this.setState({
            page: event.target.id
        })
        this.props.dispatch(detailProducts(this.state.category, this.state.product, event.target.id))
    }

    render() {
        const { pagination } = this.props
        return (
            < React.Fragment >
                <div className="row">
                    <nav aria-label="Page navigation example">

                        <ul className="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            {pagination.map((pagination) => (
                                <li class="page-item" key={pagination}><a className="page-link" onClick={this.paginateProducts} id={pagination}>{pagination}</a></li>
                            ))}
                            <li class="page-item"><a class="page-link">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        pagination: state.products.paginate
    }
}
export default withRouter(connect(mapStateToProps)(Pagination));
