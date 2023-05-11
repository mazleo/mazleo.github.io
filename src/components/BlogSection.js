import React from 'react';
import Blog from './Blog';
import BlogTile from './BlogTile';
import blogList from '../data/blogs.json';

export default class BlogSection extends React.Component {
    renderBlogTiles() {
        const blogTile = blogList.map((blog) => 
            <BlogTile img={blog.thumbnail} date={blog.date} title={blog.title} summary={blog.summary} tag={blog.tag} />
        );
        return (
            <div class="blog-tiles">
                {blogTile}
            </div>
        );
    }
    renderBlogs() {
        const blogs = blogList.map((blog) => 
            <Blog title={blog.title} date={blog.date} hero={blog.hero} blogBody={blog.blogBody} tag={blog.tag} />
        );
        return (
            <div class='blog-content'>
                {blogs}
            </div>
        );
    }
    render() {
        return (
            <div id="blog" class="blog-section home-section">
                <div class="title open-sans capitalized">Blog</div>
                {this.renderBlogTiles()}
                {this.renderBlogs()}
            </div>
        );
    }
}