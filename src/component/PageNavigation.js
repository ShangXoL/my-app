import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class PageNavigation extends Component {
    constructor(props){
        super(props);
        this.state={pages:props.pages};
        this.handlePageChage = this.handlePageChage.bind(this);
    }
    handlePageChage(page=1){
        this.setState({pages:page});
    }
    render() {
        var pagination = [];
        for(let i = 0;i < this.props.pages; i++){
            pagination.push(
                <li>
                    <a href="#" aria-label="home">
                        <span aria-hidden="true">{i+1}</span>
                    </a>
                </li>
            );
        }
        return (
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pagination}
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default PageNavigation;
