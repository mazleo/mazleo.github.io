import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SocialButton extends React.Component {
    render() {
        const fab = require("@fortawesome/free-brands-svg-icons");
        const fas = require("@fortawesome/free-solid-svg-icons");

        let icon = this.props.package == "brand" ? fab[this.props.faIcon] : fas[this.props.faIcon];

        return (
            <a class={`social-button ${this.props.class}`} href={this.props.href}>
                <FontAwesomeIcon icon={icon} />
                <span class='text'>{this.props.text}</span>
            </a>
        );
    }
}