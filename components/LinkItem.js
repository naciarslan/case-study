import React, { Component } from 'react';
import styles from './LinkItem.module.css'

class LinkItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={styles.linkitem}>
                <span className={styles.point}>
                    {this.props.point}
                    <br />
                    POINTS
                </span>
                <span className={styles.linkdata}>
                    <b>
                        {this.props.name}
                    </b>
                    <a href={this.props.url} className={styles.link} target="_blank">
                        ({this.props.url})
                    </a>
                    <button onClick={() => this.props.voteUp(this.props.id, false)} className={`${styles.votebutton} ${styles.up}`}>Up Vote</button>
                    <button onClick={() => this.props.voteDown(this.props.id, true)} className={`${styles.votebutton} ${styles.down}`}>Down Vote</button>
                    <div className="clear"></div>
                </span>
                <button onClick={() => this.props.delete(this.props.id, true)} className={styles.remove}>-</button>
            </div>
        );
    }
}



export default LinkItem;