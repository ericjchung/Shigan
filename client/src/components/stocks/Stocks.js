import React , { useEffect }from 'react'
import StockItem from './StockItem'
import { getStocks } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Stocks = ({portfolios:{current},stocks:{stocks,loading,filtered}, getStocks}) => {
    
    let data = stocks

    useEffect(() => {
        getStocks(current._id)
    }, //eslint-disable-next-line
    [])

    if (filtered !== null) {
        data = filtered
    }
    //@TODO Gotta improve tracking loading states
    return (
        <div className='container'>
            {stocks !== null && !loading ? (
                 data.map((stock) => (
                     <div className="container">
                        <StockItem key={stock["stock"]._id} stock={stock["stock"]} price={stock["price"]} />
                    </div>
                ))
            ) :  <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
           </div>}      
        </div>
    )
}

Stocks.propTypes = {
    prices: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    prices:state.prices,
    stocks:state.stocks,
    portfolios:state.portfolios
});

export default connect(mapStateToProps, { getStocks })(Stocks)