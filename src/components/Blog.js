import React from 'react';

export default class Blog extends React.Component {
    renderBlog() {
        const hero = (
            <div class='hero'>
                <img src={this.props.hero} />
            </div>
        );
        const title = ( 
            <div class='title open-sans capitalized'>
                <span class='white'>{this.props.title}</span>
            </div>
        );
        const metadata = ( 
            <div class='metadata'>
                <span class='date'>{this.props.date}</span>
            </div>
        );
        const blogBody = ( 
            <div class='blog-body' dangerouslySetInnerHTML={{__html: this.props.blogBody}} />
        );
        return (
            <div class='content'>
                {title}
                {hero}
                {metadata}
                {blogBody}
            </div>
        );
    }
    render() {
        const blogId = `${this.props.tag}--blog`;
        return (
            <div id={blogId} class='collapsible-blog hidden-blog'>
                {this.renderBlog()}
            </div>
        );
    }
}