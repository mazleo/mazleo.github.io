import React from 'react';
import BlogElement from './BlogElement';
import blogList from '../data/blogs.json';

export default class BlogSection extends React.Component {
    renderMostRecentGrid() {
        const blogElements = blogList.map((blog) => 
            <BlogElement img={blog.img} date={blog.date} title={blog.title} summary={blog.summary} />
        );

        return (
            <div class="most-recent-grid">
                {blogElements}
            </div>
        );
    }
    render() {
        return (
            <div class="blog-section home-section">
                <div class="title open-sans capitalized">Blog</div>
                {this.renderMostRecentGrid()}
                <div class="link-wrapper">
                    <a href="/" class="link open-sans capitalized">See More</a>
                </div>
            </div>
        );
    }
}