import { ScanFace, FileText, Scale, Cpu } from 'lucide-react';
import './ScannerFeatures.css';



// Refined content based on the FIRST item in the prompt which was "Verified Identity" in my plan, but the prompt text "GDPR compliant..."
// Actually, let's look closer at the prompt's CSS block.
// It has "Heading 3 -> GDPR compliant..." multiple times.
// But the user *also* uploaded an image.
// And I wrote a plan with specific text: "Verified Identity...", "Audit Trails...", etc.
// And the user said "LGTM".
// So I will use the text from my PLAN.
// For the first item, my plan said: "Verified Identity...".
// Wait, where did I get that text in my plan? I inferred it or saw it in the image in previous turn?
// Ah, the user uploaded an image in the FIRST turn.
// I can't see the image content *now* freely, but I *did* write it in the plan and it was approved.
// So I will stick to the plan's text.

const featuresData = [
    {
        icon: ScanFace,
        title: "Verified Identity.",
        content: "Every actor on Theatre.ai has a CastID: a secure identity that prevents impersonation, fraud, and unauthorized AI use."
    },
    {
        icon: FileText,
        title: "Audit Trails and Compliance.",
        content: "Every usage log. Every expiration. Every revocation. Time-stamped. Transparent. DPDP and global-framework ready."
    },
    {
        icon: Scale,
        title: "Standardized Licensing.",
        content: "Industry-ready contract templates, reviewed by legal experts and adapted for AI use cases. No more back-and-forth. No more uncertainty."
    },
    {
        icon: Cpu,
        title: "Usage Tokens for AI.",
        content: "Once a contract is approved, Theatre.ai generates a cryptographically signed usage token—proof of permission your AI tools can verify instantly."
    }
];

export default function ScannerFeatures() {
    return (
        <div className="scanner-features-container">
            {featuresData.map((feature, index) => (
                <div key={index} className="feature-item">
                    <div className="feature-icon-container">
                        <feature.icon className="feature-icon" strokeWidth={1.875} />
                    </div>
                    <div className="feature-text-container">
                        <p className="feature-text-paragraph">
                            <span className="feature-title">{feature.title}</span>
                            <span className="feature-spacer"> </span>
                            <span className="feature-description">{feature.content}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
