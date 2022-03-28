import Header from "../Header/Header";
 import SearchBar from "./SearchBar";
 import EmployeeList from "../Employee/EmployeeList";

var HomePage = React.createClass({
    render: function () {
        
        return (
            <div className={"page " + this.props.position}>
                <Header text="Employee Directory" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        );
    }
});

export default HomePage;