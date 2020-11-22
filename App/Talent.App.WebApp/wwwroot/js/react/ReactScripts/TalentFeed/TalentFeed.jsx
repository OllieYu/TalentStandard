import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Grid} from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {name: '', phone: '', email: '', location: {country: '', city: ''}}
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.loadData()
        this.init()
    };

   
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.setState({
                    companyDetails: res.employer.companyContact
                })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }

    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container" style={{minHeight:'40rem'}}>
                <br/>
                <Grid>
                    <Grid.Column width={4}>
                    <CompanyProfile
                    details = {this.state.companyDetails}
                    /> 
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <TalentCard />
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <FollowingSuggestion /> 
                    </Grid.Column>
                </Grid>
                </div>
            </BodyWrapper>
        )
    }
}