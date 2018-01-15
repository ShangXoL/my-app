import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class PageNavigation extends Component {
    constructor(props){
        super(props);
        this.state={pages:props.pages};
    }
    render() {
        var pages = [];
        //alert(this.state.pages);
        for(let i = 0;i <this.state.pages;i++){
            pages.push(<li><a href="#">{i+1}</a></li>);
        }
        return (
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pages}
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
