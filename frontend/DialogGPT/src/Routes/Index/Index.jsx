import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/ButtonOrange/Button'; // Adjusted path
import './Index.css';

export default function Index() {
    const navigate = useNavigate();

    const projects = [
        {
            id: 1,
            name: "DialogGPT",
            description: "Production-style conversational AI trained on Movie Dialog Corpus with custom PyTorch models, FastAPI inference, React UI, Redis caching, MLflow tracking, and Kubernetes-ready deployment.",
            repoLink: "https://github.com/CodingBlood/DialogGPT",
            route: "/DialogGPT"
        },
        // You can add more projects here in the future
    ];

    return (
        <div className="index-container">
            <header className="index-header">
                <h1>My <span className="highlight">Projects</span></h1>
                <p>Select a project to explore its features.</p>
            </header>

            <div className="project-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="card-content">
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>

                            <div className="card-links">
                                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="repo-link">
                                    View Repository
                                </a>
                            </div>
                        </div>

                        <div className="card-footer">
                            {/* Reusing your ButtonOrange to navigate */}
                            <Button onClick={() => navigate(project.route)} delay="0.2s" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}