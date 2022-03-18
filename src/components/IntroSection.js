import React from 'react';
import SocialButton from './SocialButton'
import socialsList from '../data/socials.json'

export default class IntroSection extends React.Component {
    renderSocials() {
        const socialButtons = socialsList.map((social) => 
            <SocialButton class={social.class} href={social.href} faIcon={social.faIcon} text={social.text} package={social.package}/>
        );

        return (
            <div class='socials'>
                {socialButtons}
            </div>
        );
    }
    render() {
        return (
            <div class='intro-section home-section'>
                {this.props.fullName}
                {this.props.description}
                {this.renderSocials()}
            </div>
        );
    }
}