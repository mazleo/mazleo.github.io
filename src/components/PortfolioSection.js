import React from 'react';
import Project from './Project';
import projectsList from '../data/projects.json';

export default class PortfolioSection extends React.Component {
    renderProjects() {
        const projects = projectsList.map((project) => 
            <Project targetId={project.targetId} img={project.img} title={project.title} href={project.href} techStack={project.techStack} description={project.description} />
        );

        return (
            <div class="grid">
                {projects}
            </div>
        );
    }
    render() {
        return (
            <div class="portfolio-section home-section" id="portfolio">
                <div class="title open-sans capitalized">Portfolio</div>
                {this.renderProjects()}
            </div>
        );
    }
}