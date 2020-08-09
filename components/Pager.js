import React, { Component } from 'react';
import styles from './Pager.module.css'

class Pager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagerSize: [],
            activePageIndex: 0,
        }
    }
    componentDidMount() {
        this.preaparePager();
    }
    preaparePager() {
        const pageCount = Math.ceil(this.props.pagerSize / 5);
        const pagerArray = Array(pageCount).fill(0)
        this.setState({ pagerSize: pagerArray })
    }
    render() {


        return (
            <div className={styles.pager}>

                <button onClick={() => { this.setState({ activePageIndex: this.state.activePageIndex - 1 }); this.props.changePage(this.state.activePageIndex - 1) }} disabled={this.state.activePageIndex == 0}>
                    Prev
                </button>

                {this.state.pagerSize.map((item, index) => {
                    return <button key={index} className={this.state.activePageIndex == index ? styles.active : ''} onClick={() => { this.setState({ activePageIndex: index }); this.props.changePage(index) }}>
                        {index + 1}
                    </button>
                })}

                <button onClick={() => { this.setState({ activePageIndex: this.state.activePageIndex + 1 }); this.props.changePage(this.state.activePageIndex + 1) }} disabled={this.state.activePageIndex == this.state.pagerSize.length}>
                    Next
                </button>
            </div>
        );
    }
}



export default Pager;

