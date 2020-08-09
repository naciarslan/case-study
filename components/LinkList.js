import React, { Component } from 'react';
import Link from 'next/link'
import LinkItem from './LinkItem';
import Pager from './Pager'
import styles from './LinkList.module.css'


class LinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkList: null,
            isDeletedSuccessfully: null,
            pageIndex: 0,
            pageSize: 5,
        }

        this.vote = this.vote.bind(this);
        this.setPage = this.setPage.bind(this);
        this.remove = this.remove.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }
    setPage(index) {
        console.log(index)
        index *= this.state.pageSize;
        this.setState({ pageIndex: index });

    }
    componentDidMount() {
        if (localStorage.getItem('links') != null && this.state.linkList == null)
            this.setState({ linkList: JSON.parse(localStorage.getItem('links')).reverse() });
    }
    changeOrder(e) {
        const links = this.state.linkList;
        if (e.target.value == true) {
            links.sort((a, b) => (a.point > b.point) ? 1 : -1).reverse();
        }
        else {
            links.sort((a, b) => (a.point > b.point) ? 1 : -1);
        }
        this.setState({ linkList: links });
    }
    getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return dd + '/' + mm + '/' + yyyy + '-' + time;
    }
    vote(id, type) {
        const links = [...this.state.linkList];
        const target = links.findIndex((item) => item.id == id);
        links[target].point = type ? links[target].point - 1 : links[target].point + 1;
        links[target].voteDate = this.getCurrentDate();


        links.sort((a, b) => (a.point > b.point) ? 1 : (a.point === b.point) ? ((a.voteDate > b.voteDate) ? 1 : -1) : -1).reverse();
        document.getElementById("orderSelect").value = 1;
        this.setState({ linkList: links });

        this.updateLocalStorage();
    }
    updateLocalStorage() {
        localStorage.removeItem('links');
        localStorage.setItem('links', JSON.stringify(this.state.linkList));
    }
    remove(id) {
        let links = this.state.linkList;
        const target = links.filter((item) => item.id == id)[0].name;
        const newList = links.filter((item) => item.id != id);
        const ask = confirm(`Do you want to remove: ${target}`);
        if (ask) {
            if (newList.length == 0) {
                localStorage.removeItem('links');
                this.setState({ linkList: null });
            }
            else {
                this.setState({ linkList: newList });
                this.updateLocalStorage();
            }

            this.showDeletedToast(target);
        }

    }
    showDeletedToast(name) {
        this.setState({ isDeletedSuccessfully: name });
        setTimeout(() => {
            this.setState({ isDeletedSuccessfully: null });
        }, 1500);
    }
    render() {
        return (
            <div>
                <Link href="/add">
                    <a className={styles.addlink}>SUBMIT A LINK</a>
                </Link>
                <hr className="divider" />
                {this.state.linkList != null ?
                    <>
                        <select className={styles.orderselect} name="sort" id="orderSelect" onChange={this.changeOrder}>
                            <option value="1">Most Voted</option>
                            <option value="0">Less Voted</option>
                        </select>
                        {this.state.isDeletedSuccessfully != null ?
                            <div className="success-toast">
                                {this.state.isDeletedSuccessfully} removed
                            </div>
                            : ''}
                        <ul className={styles.cc}>
                            {this.state.linkList.slice(this.state.pageIndex, this.state.pageIndex + this.state.pageSize).map((value, index) => {
                                return <li key={index}>
                                    <LinkItem name={value.name}
                                        point={value.point}
                                        url={value.url}
                                        id={value.id}
                                        voteUp={this.vote}
                                        voteDown={this.vote}
                                        delete={this.remove}
                                    />
                                </li>
                            })}
                        </ul>
                        {this.state.linkList.length > this.state.pageSize ?
                            <Pager changePage={this.setPage} pagerSize={this.state.linkList.length} />
                            : ''}
                    </> : ''}
            </div>
        );
    }
}


export default LinkList;