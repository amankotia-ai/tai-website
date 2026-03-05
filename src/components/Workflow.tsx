import './Workflow.css';

export default function Workflow() {
    return (
        <section className="workflow-section">
            <div className="section-header">
                <span className="section-pill">How It Works</span>
                <h2 className="section-heading">
                    A simple workflow for a<br />
                    <span className="section-heading-bold">complex industry</span>
                </h2>
            </div>

            <div className="workflow-steps">
                {/* Step 1 */}
                <div className="workflow-step">
                    <div className="workflow-card">
                        <img
                            src="/1.png"
                            alt="Verification progress"
                            className="workflow-card-image"
                        />
                    </div>
                    <div className="workflow-content">
                        <h3 className="workflow-step-title">Step 1 — Verify</h3>
                        <p className="workflow-step-desc">
                            Actors create a CastID to verify their identity and upload approved likeness/voice data.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="workflow-step reverse">
                    <div className="workflow-card">
                        <img
                            src="/2.png"
                            alt="License details"
                            className="workflow-card-image"
                        />
                    </div>
                    <div className="workflow-content">
                        <h3 className="workflow-step-title">Step 2 — License</h3>
                        <p className="workflow-step-desc">
                            Studios request usage rights with clear terms—duration, geography, output type, restrictions, and more.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="workflow-step">
                    <div className="workflow-card">
                        <img
                            src="/3.png"
                            alt="Consent matrix"
                            className="workflow-card-image"
                        />
                    </div>
                    <div className="workflow-content">
                        <h3 className="workflow-step-title">Step 3 — Generate</h3>
                        <p className="workflow-step-desc">
                            Once approved, contracts are signed electronically and a usage token is issued. Your AI tools can validate permissions in real time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
