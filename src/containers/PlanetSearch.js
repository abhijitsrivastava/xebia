import React, { Component } from "react";
import PlanetList from '../components/PlanetList'
import Search from '../components/Search';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../redux/actions/action'
import SweetAlert from 'react-bootstrap-sweetalert';

class PlanetSearch extends Component {
    constructor() {
        super();
        this.state = {
            filterText: '',
            data: [],
            plantInfo: {}
        }
        this.onLogOut = this.onLogOut.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onPlantClick = this.onPlantClick.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    componentWillReceiveProps(newProps) {
        let { searchInfo } = newProps;
        if (searchInfo.success) {
            this.setState({ data: searchInfo.results });
        } else if (!searchInfo.success && searchInfo.showAlert) {
            this.setState({ showAlert: true, alertText: searchInfo.alertText });
        }
    }

    componentDidMount() {
        this.props.searchPlanet('');
    }

    onPlantClick(info) {
        console.log(info);
        this.setState({ isOpen: true, plantInfo: info, showAlert: true });
    }

    getPlanets(text) {
        this.props.searchPlanet(text);
    }

    filterUpdate(e) {
        this.getPlanets(e);
    }

    onLogOut() {
        this.props.history.push('/login')
    }

    closeModal() {
        this.setState({ isOpen: false });
    }

    hideAlert() {
        this.setState({ showAlert: false });
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar theme">
                        <div className="container-fluid">
                            <ul className="nav navbar-nav navbar-right">
                                <button type="button" className="btn btn-default navbar-btn " onClick={this.onLogOut}>Log out</button>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main>
                    <Search
                        filterVal={this.state.filterText}
                        filterUpdate={this.filterUpdate.bind(this)}
                    />
                    <PlanetList
                        data={this.state.data}
                        filter={this.state.filterText}
                        handleClick={this.onPlantClick}
                    />
                </main>
                {
                    this.state.isOpen &&
                    <div className={"modal " + (this.state.isOpen ? "show" : "hide")}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button className="close" onClick={this.closeModal}>
                                        <span>&times;</span>
                                    </button>
                                    <h4 className="modal-title" id="myModalLabel">{"Planet Info"}</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ul>
                                                <li>Name - {this.state.plantInfo.name}</li>
                                                <li>Population - {this.state.plantInfo.population}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.showAlert ? <SweetAlert title={'Name : ' + this.state.plantInfo.name + ' ( Population : ' + this.state.plantInfo.population + ' )'} 
                    onConfirm={this.hideAlert} /> : null
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return { 
        searchInfo: state.search,
        loggedIn: state.isLoggedIn
    };
}

export default connect(mapStateToProps, action)(withRouter(PlanetSearch));