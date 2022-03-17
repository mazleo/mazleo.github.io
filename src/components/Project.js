import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default class Project extends React.Component {
    render() {
        const imgClass = !this.props.img ? "display-none" : "";
        return (
            <div class="project">
                <a class="link" href={this.props.href}>
                    <img class={`img ${imgClass}`} src={this.props.img} />
                    <div id={this.props.targetId}></div>
                    <div class="text">
                        <span class="title open-sans capitalized">{this.props.title}</span>
                        <span class="tech-stack"><FontAwesomeIcon icon={faLayerGroup} />{this.props.techStack}</span>
                        <span class="description">{this.props.description}</span>
                    </div>
                </a>
            </div>
        );
    }
}