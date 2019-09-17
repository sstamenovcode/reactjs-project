import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import db from '../../firestoreInit';
import { fetchPosts } from '../../actions/postActions';
import Posts from '../Posts/Posts';
import Pagination from '../../components/Pagination/Pagination';

import './Clubs.scss';

class Clubs extends Component {
    state = {
        value: '',
        suggestions: [],    
        loading: false,
        currentPage: 1,
        postsPerPage: 5,
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    openClubPage = (e, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        db
            .collection('articles')
            .where('title', '==', suggestionValue)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.props.history.push(`/clubs/${doc.id}`);
                });
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.posts.filter(post => {
        return post.title.toLowerCase().slice(0, inputLength) === inputValue;
        });
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    }

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div>
            {suggestion.title}
        </div>
    );

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.props.posts.slice(indexOfFirstPost, indexOfLastPost);
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type the name of the club',
            value,
            onChange: this.onChange
        };

        return (
            <div className="clubs-container">
                <h1 className="heading">Find clubs</h1>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.openClubPage}
                />
                <h2 className="heading">All clubs</h2>
                <Posts
                    postItems={currentPosts}
                    loading={this.state.loading}
                />
                <Pagination 
                    totalPosts={this.props.posts.length}
                    postsPerPage={this.state.postsPerPage}
                    paginate={this.paginate}
                    activePage={this.state.currentPage}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clubs));
