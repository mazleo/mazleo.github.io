import React from 'react';
import Blog from './Blog';

export default class BlogTile extends React.Component {
    async handleClick() {
        const blogTileId = `${this.props.tag}--tile`;
        const blogElementId = `${this.props.tag}--blog`;
        const blogTile = document.getElementById(blogTileId);
        const blogElement = document.getElementById(blogElementId);
        const expansionDelay = 500;
        if (blogElement.classList.contains('hidden-blog')) {
            blogElement.classList.remove('hidden-blog');
            blogElement.classList.add('expanding-blog');
            await new Promise(r => setTimeout(r, expansionDelay));
            blogElement.classList.add('active-blog');
            blogElement.classList.remove('expanding-blog');
            blogElement.scrollIntoView({behavior: 'smooth'});
        }
        else {
            blogElement.classList.remove('active-blog');
            blogElement.classList.add('collapsing-blog');
            await new Promise(r => setTimeout(r, expansionDelay));
            blogElement.classList.add('hidden-blog');
            blogElement.classList.remove('collapsing-blog');
        }
    }
    componentDidMount() {
        const blogTileId = `${this.props.tag}--tile`;
        const blogTile = document.getElementById(blogTileId);
        blogTile.addEventListener('click', this.handleClick.bind(this));
    }
    render() {
        const tileId = `${this.props.tag}--tile`;
        const tile = (
            <div id={tileId} class="blog-tile">
                <img src={this.props.img} class="hero"/>
                <div class="content">
                    <span class="title open-sans capitalized">{this.props.title}</span>
                    <span class="date">{this.props.date}</span>
                    <span class="summary">{this.props.summary}</span>
                </div>
            </div>
        );
        return tile;
    }
}