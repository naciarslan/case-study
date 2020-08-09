import React, { Component } from 'react';
import Link from 'next/link';
import styles from './AddLink.module.css'


class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "",
            isSavedSuccessfully: false,
            lastAddedItemName: ""
        }

        this.updateState = this.updateState.bind(this);
        this.addUrl = this.addUrl.bind(this);

    }

    updateState(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return dd + '/' + mm + '/' + yyyy + '-' + time;
    }
    addUrl() {

        if (localStorage.getItem('links') == null) {
            let firstLink = [{
                id: 0,
                name: this.state.name,
                url: this.state.url,
                point: 0,
                date: this.getCurrentDate(),
                voteDate: this.getCurrentDate(),
            }]
            this.updateLocaStorage(firstLink)
        }
        else {
            let newData = JSON.parse(localStorage.getItem('links'));
            newData.push({
                id: newData[newData.length - 1].id + 1,
                name: this.state.name,
                url: this.state.url,
                point: 0,
                date: this.getCurrentDate(),
                voteDate: this.getCurrentDate(),
            })
            localStorage.removeItem('links');
            this.updateLocaStorage(newData);
            this.setState({ lastAddedItemName: this.state.name })
        }
    }
    updateLocaStorage(data) {
        localStorage.setItem('links', JSON.stringify(data));
        this.showSuccessMessage()
    }
    showSuccessMessage() {
        this.setState({ isSavedSuccessfully: true });

        setTimeout(() => {
            this.setState({ isSavedSuccessfully: false });
        }, 1500);
    }
    render() {

        return (
            <div className="add-form">
                {this.state.isSavedSuccessfully ?
                    <div className="success-toast">
                        {this.state.lastAddedItemName} added
                    </div>
                    : ''}
                <Link href="/">
                    <a>Return to List</a>
                </Link>
                <h3>
                    Add New Link
                </h3>
                <label>Link Name:</label>
                <input type="text" className={styles.input} value={this.state.value} name="name" onChange={this.updateState} placeholder="e.g Alphabet" />
                <label>Link URL:</label>
                <input type="text" className={styles.input} value={this.state.value} name="url" onChange={this.updateState} placeholder="e.g https://abc.xyz/" />
                <button className={styles.add} onClick={this.addUrl}>ADD</button>
                <div className="clear"></div>
            </div>
        );
    }
}



export default AddLink;