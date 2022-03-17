import React from 'react';

export default class BlogElement extends React.Component {
    render() {
        return (
            <div class="blog-element">
                <img src={this.props.img} class="img"/>
                <div class="body">
                    <span class="date">{this.props.date}</span>
                    <span class="title">{this.props.title}</span>
                    <span class="summary">{this.props.summary}</span>
                </div>
            </div>
        );
    }
}