import React from 'react';

export default class Project extends React.Component {
    render() {
        const imgClass = !this.props.img ? "display-none" : "";
        return (
            <div class="project">
                <a class="link" href={this.props.href}>
                    <img class={`img ${imgClass}`} src={this.props.img} />
                    <div id={this.props.targetId}></div>
                    <span class="title open-sans capitalized">{this.props.title}</span>
                </a>
            </div>
        );
    }
}