import React from "react";

class Pagination extends React.Component {
    handlePrevious = () => {
        const { page, onPageChange } = this.props;
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    handleNext = () => {
        const { page, totalPages, onPageChange } = this.props;
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    handlePageClick = (pageNumber) => {
        const { onPageChange } = this.props;
        onPageChange(pageNumber);
    };

    render() {
        const { page, totalPages } = this.props;
        // console.log("Page:", page, "Total Pages:", totalPages);

        return (
            <div className="pagination">
                <button 
                    className="paginationButton" 
                    onClick={this.handlePrevious} 
                    disabled={page === 1}
                >
                    &lt;
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            className={`paginationButton ${page === pageNumber ? 'active' : ''}`}
                            onClick={() => this.handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button 
                    className="paginationButton" 
                    onClick={this.handleNext} 
                    disabled={page === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    }
}

export default Pagination;
