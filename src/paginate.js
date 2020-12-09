import React from 'react';
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items) {
            this.setPage(this.props.initialPage);
        }
    }
    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(items, page, pageSize);
        // get new page of items from items array
        // var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // update state
        this.setState({ pager: pager });
        // call change page function in parent component
        // this.props.onChangePage(pageOfItems);
    }
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 10;
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 2) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 2) {
                startPage = 1;
                endPage = 2;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    buttonPress = (val) => {
        // console.log("next", val);
        this.props.onChangePage(val);
        this.setPage(val)
    }
    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'pre_disabled' : ''}>
                    <a onClick={() => this.buttonPress(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.buttonPress(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'next_disabled' : ''}>
                    <a onClick={() => this.buttonPress(pager.currentPage + 1)}>Next</a>
                </li>
            </ul>
        );
    }
}
export default Pagination;
