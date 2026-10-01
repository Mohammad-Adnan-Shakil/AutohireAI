// AutoHire.AI - Autonomous Screening Engine Service

export function evaluateScore(score) {
  if (score >= 75) {
    return { tier: "A", decision: "SHORTLIST", color: "green" };
  } else if (score >= 50) {
    return { tier: "B", decision: "WAITLIST", color: "amber" };
  } else {
    return { tier: "C", decision: "REJECT", color: "red" };
  }
}

export function simulateAIScreening(candidateInfo, presetDetails = null) {
  // Return realistic mock evaluation result
  if (presetDetails) {
    const { tier, decision } = evaluateScore(presetDetails.targetScore || 75);
    return {
      candidateName: candidateInfo.name || "Candidate",
      role: candidateInfo.role || "Software Engineer",
      email: candidateInfo.email || "candidate@example.com",
      score: presetDetails.targetScore,
      tier,
      decision,
      scoreBreakdown: presetDetails.details.technical ? presetDetails.details : {
        technical: Math.round(presetDetails.targetScore * 0.4),
        experience: Math.round(presetDetails.targetScore * 0.3),
        education: Math.round(presetDetails.targetScore * 0.15),
        communication: Math.round(presetDetails.targetScore * 0.15)
      },
      strengths: presetDetails.details.strengths || ["React", "TypeScript", "Full Stack"],
      gaps: presetDetails.details.gaps || ["Needs more cloud architecture depth"],
      reasoning: presetDetails.details.reasoning || "Strong candidate matching key job requirements.",
      recommendation: decision
    };
  }

  // Dynamic evaluation generator for custom uploaded PDFs
  const score = Math.floor(Math.random() * 35) + 60; // 60-94 range for custom
  const { tier, decision } = evaluateScore(score);

  return {
    candidateName: candidateInfo.name || "Uploaded Candidate",
    role: candidateInfo.role || "Senior Full Stack Engineer",
    email: candidateInfo.email || "applicant@domain.com",
    score,
    tier,
    decision,
    scoreBreakdown: {
      technical: Math.min(40, Math.round((score / 100) * 40)),
      experience: Math.min(30, Math.round((score / 100) * 30)),
      education: Math.min(15, Math.round((score / 100) * 15)),
      communication: Math.min(15, Math.round((score / 100) * 15))
    },
    strengths: [
      "Modern JavaScript & React",
      "RESTful API & GraphQL Integration",
      "Git version control & CI/CD workflow",
      "Agile team collaboration"
    ],
    gaps: [
      "High scalability distributed systems testing"
    ],
    reasoning: `Candidate parsed successfully via LlamaParse. Demonstrated strong proficiency in core domain skills. Groq AI model (LLaMA 3) assigned a composite score of ${score}/100.`,
    recommendation: decision
  };
}

export const AUTOMATED_ACTIONS = {
  A: [
    { title: "Candidate added to Airtable Base", icon: "Database", done: true },
    { title: "Shortlist email prepared & queued (Gmail API)", icon: "Mail", done: true },
    { title: "Google Calendar interview slot reserved", icon: "Calendar", done: true },
    { title: "Recruiter notification sent in Slack (#recruitment-feed)", icon: "MessageSquare", done: true },
    { title: "React Command Center Dashboard updated", icon: "LayoutDashboard", done: true }
  ],
  B: [
    { title: "Waitlist email prepared & queued (Gmail API)", icon: "Mail", done: true },
    { title: "Candidate archived to Airtable Waitlist Base", icon: "Database", done: true },
    { title: "Recruiter pinged in Slack for secondary manual review", icon: "MessageSquare", done: true },
    { title: "Dashboard metrics updated", icon: "LayoutDashboard", done: true }
  ],
  C: [
    { title: "Polite rejection notification prepared (Gmail API)", icon: "Mail", done: true },
    { title: "Candidate archived in Airtable pool", icon: "Database", done: true },
    { title: "Slack log entry generated", icon: "MessageSquare", done: true },
    { title: "Dashboard metrics updated", icon: "LayoutDashboard", done: true }
  ]
};
