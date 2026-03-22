import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Groq from "groq-sdk";
import OpenAI from "openai";
import {
  upsertContact,
  addTagToContact,
  getDealsByContact,
  updateDealStage,
} from "@/lib/activecampaign";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ActiveCampaign Stage IDs (Flynerd Auto-Pilot Pipeline)
const STAGE_NEGOTIATING = "12";

// ─────────────────────────────────────────────────────────────────────────────
// FLYNERD TECH KNOWLEDGE BASE
// Source of truth for the closer agent. Update here, not in the prompt.
// ─────────────────────────────────────────────────────────────────────────────
const FLYNERD_KB = `
## Company
FlyNerd Tech is an Atlanta-based AI automation agency serving clients globally.
Founded by a Solutions Architect with 15+ years in technology, marketing operations,
and business systems design. Mission: democratize AI-powered automation for small and
midsize service businesses. Values: lateral thinking, radical creativity, cross-domain
expertise, "AI as the intern" (AI does heavy lifting, humans provide judgment).

## What We Build
We build productized growth systems — AI automations, workflows, and AI concierge
agents that help service businesses get better leads, faster follow-up, and less
manual work. We connect AI to the tools our clients already use.

## Services & Pricing (always reference these exact figures)

1. AUTOMATION AUDIT + ROADMAP — $495 one-time
   Best first step. 60-90 min strategy + systems audit, 30-day implementation roadmap,
   3 quick-win opportunities, priority score by impact/effort, proposal credit option.
   Book at: https://www.flynerd.tech/contact?package=automation-audit

2. QUICKSTART WORKFLOW BUILD — $1,250 one-time
   One fixed-scope workflow: 1 workflow (trigger + actions), up to 3 tool integrations,
   business logic + routing rules, QA + test scenarios, Loom walkthrough + docs,
   1 revision round.
   Start at: https://www.flynerd.tech/contact?package=quickstart-build

3. AI CONCIERGE LAUNCH — $2,400 one-time
   Full AI lead or support concierge: website/chat channel setup, knowledge base
   bootstrapping, qualification flow + lead capture, human handoff logic,
   CRM + notifications integration, launch checklist + training.
   Launch at: https://www.flynerd.tech/contact?package=agent-launch

4. MONTHLY CARE PLAN — $750/month
   Monitoring + iterative improvements: issue triage, up to 2 improvement tickets/month,
   performance summary report, monthly optimization review, priority async support,
   SLA response windows.
   Join at: https://www.flynerd.tech/contact?package=care-plan

5. GROWTH OPS PARTNER — $1,800/month (multi-system retainer)
   Everything in Care Plan plus: multi-workflow optimization, quarterly roadmap planning,
   advanced automation experiments, cross-channel reporting, Slack/priority support.
   Apply at: https://www.flynerd.tech/contact?package=growth-partner

## FAQ
- Do I need to start with an audit? For custom/multi-system work, yes. Audit ensures
  highest-ROI workflow and avoids scope creep.
- How long do projects take? Audit: 2-3 business days. Quickstart builds: 1-2 weeks.
  Agent launches: 2-4 weeks.
- Payment terms: Under $2,000 paid upfront. Larger scopes use milestone billing.
  Retainers are monthly with 3-month minimum.
- Can we expand after launch? Yes — most clients start with one workflow/agent then
  expand via Care Plan or Growth Partner.
- Custom packages? Yes — we create a custom SOW after the audit.

## What We Do NOT Do
We do not build standalone websites as a primary service. We build AI automations,
AI agents, and workflow systems that integrate with existing or new websites.
The demo website a prospect received is a proof-of-capability demo, not our core product.
Our core product is the AI automation and workflow system underneath it.

## Booking
Best next step for any interested prospect: Book a free strategy call at
https://www.flynerd.tech/contact or start with the $495 Automation Audit.
`;

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function buildSystemPrompt(businessName: string): string {
  return `You are Jordan, a senior Sales Executive at FlyNerd Tech — an Atlanta-based AI automation agency.
You are responding to an inbound email from ${businessName}, a local business owner who received our personalized demo.

Your personality: confident, knowledgeable, genuinely helpful, zero fluff. You write like a real human — not corporate, not salesy.
Your goal: answer their question accurately, move them toward booking a call or the right package.

CRITICAL RULES:
1. Answer ONLY what was asked. Do not volunteer unrelated information.
2. Use ONLY the pricing and service details from the knowledge base below. Never invent numbers.
3. If asked about cost, always recommend starting with the $495 Automation Audit as the lowest-risk entry point, then explain the relevant build package.
4. If asked what you do or what services you offer, describe the AI automation and workflow systems — NOT just the demo website.
5. If the question is outside your knowledge base (e.g., a general industry question about AI, automation trends, or tech best practices), answer as a knowledgeable expert. You have deep knowledge of AI automation, n8n, ActiveCampaign, make.com, Zapier, CRM systems, and local business marketing.
6. NEVER include meta-commentary, notes, or explanations about your response (e.g. "This email aims to..."). Return ONLY the email body text.
7. Keep replies under 150 words unless the question genuinely requires more detail.
8. Always end with a clear single next step — book a call, reply with questions, or a relevant package link. Never end with multiple CTAs.
9. Sign off as: Jordan | FlyNerd Tech

FORMATTING RULES (critical — this is a plain text email):
- Use blank lines between paragraphs (one empty line = paragraph break).
- Do NOT use markdown: no **, no ##, no bullet dashes, no asterisks.
- If listing items, write them as separate lines with a simple dash or number, each on its own line with a blank line before and after the list.
- Do NOT use \n literally — just write natural paragraph breaks.
- Do NOT use HTML tags.
- The email must read cleanly in a standard Gmail inbox as plain text.

EXAMPLE of correct formatting:
Hi [Name],

Great question. Here is what that includes:

- Item one
- Item two
- Item three

Ready to move forward? Reply here and I will get you set up.

Jordan | FlyNerd Tech

KNOWLEDGE BASE:
${FLYNERD_KB}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS — extract clean fields from n8n Gmail trigger payload
// n8n Gmail trigger sends nested objects, not flat TextBody/From
// ─────────────────────────────────────────────────────────────────────────────
function extractEmail(from: any): string {
  // Handle "Name <email@domain.com>" format
  if (typeof from === "string") {
    const match = from.match(/<([^>]+)>/);
    return (match ? match[1] : from).toLowerCase().trim();
  }
  // Handle n8n Gmail trigger format: from.value[0].address
  if (Array.isArray(from?.value)) {
    return (from.value[0]?.address || "").toLowerCase().trim();
  }
  return "";
}

function extractTextBody(body: any): string {
  // Direct TextBody (Postmark/webhook format)
  if (typeof body.TextBody === "string" && body.TextBody.trim()) {
    return body.TextBody.trim();
  }
  // n8n Gmail format: body.text or body.body
  if (typeof body.text === "string" && body.text.trim()) {
    return body.text.trim();
  }
  if (typeof body.body === "string" && body.body.trim()) {
    return body.body.trim();
  }
  // Fallback: snippet (truncated but better than nothing)
  if (typeof body.snippet === "string" && body.snippet.trim()) {
    return body.snippet.trim();
  }
  return "";
}

function extractThreadId(body: any): string | null {
  return body.threadId || body.ThreadId || body.thread_id || null;
}

function extractMessageId(body: any): string | null {
  return body.id || body.messageId || body.MessageId || null;
}

function extractFromRaw(body: any): string {
  // Support both flat and nested n8n Gmail formats
  if (body.From) return body.From;
  if (body.from) {
    if (typeof body.from === "string") return body.from;
    if (Array.isArray(body.from?.value)) {
      const v = body.from.value[0];
      return v?.name ? `${v.name} <${v.address}>` : v?.address || "";
    }
  }
  return "";
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATION MEMORY — Supabase via Prisma raw queries
// Table: email_conversation_threads
// ─────────────────────────────────────────────────────────────────────────────
async function getThreadHistory(threadId: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const rows = await prisma.$queryRaw<Array<{ role: string; content: string; created_at: Date }>>`
      SELECT role, content, created_at
      FROM email_conversation_threads
      WHERE thread_id = ${threadId}
      ORDER BY created_at ASC
      LIMIT 20
    `;
    return rows.map((r) => ({ role: r.role, content: r.content }));
  } catch {
    // Table may not exist yet — fail gracefully, stateless fallback
    console.warn("[Closer] Thread history unavailable — running stateless");
    return [];
  }
}

async function saveThreadMessage(
  threadId: string,
  leadEmail: string,
  role: "user" | "assistant",
  content: string
): Promise<void> {
  try {
    await prisma.$executeRaw`
      INSERT INTO email_conversation_threads (thread_id, lead_email, role, content, created_at)
      VALUES (${threadId}, ${leadEmail}, ${role}, ${content}, NOW())
    `;
  } catch (e) {
    console.warn("[Closer] Could not save thread message:", e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GROQ with OpenAI fallback
// ─────────────────────────────────────────────────────────────────────────────
async function generateReply(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const formattedMessages = messages.map((m) => ({
    role: m.role as "user" | "assistant" | "system",
    content: m.content,
  }));

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...formattedMessages],
      temperature: 0.4, // Lower = more factual, less hallucination
      max_tokens: 600,
    });
    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (groqErr: any) {
    console.warn("[Closer] Groq failed, falling back to OpenAI:", groqErr.message);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const fallback = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...formattedMessages],
      temperature: 0.4,
      max_tokens: 600,
    });
    return fallback.choices[0]?.message?.content?.trim() || "";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const start = Date.now();

  try {
    const body = await req.json();

    // Extract fields — handles both n8n Gmail format and direct webhook format
    const fromRaw = extractFromRaw(body);
    const leadEmail = extractEmail(fromRaw || body.from || body.From);
    const textBody = extractTextBody(body);
    const threadId = extractThreadId(body);
    const messageId = extractMessageId(body);

    if (!leadEmail) {
      console.error("[Closer] Could not extract sender email. Payload:", JSON.stringify(body).slice(0, 500));
      return NextResponse.json({ error: "Missing or unreadable sender email" }, { status: 400 });
    }

    if (!textBody) {
      console.error("[Closer] Could not extract message body. Payload:", JSON.stringify(body).slice(0, 500));
      return NextResponse.json({ error: "Missing or unreadable message body" }, { status: 400 });
    }

    // Find lead in DB
    const lead = await prisma.agencyLead.findFirst({
      where: { contactEmail: leadEmail },
    });

    // Use business name from DB or fall back to email domain
    const businessName = lead?.businessName || leadEmail.split("@")[1]?.split(".")[0] || "there";

    // Update lead status if found
    if (lead) {
      await prisma.agencyLead.update({
        where: { id: lead.id },
        data: { status: "NEGOTIATING" },
      });
    }

    // Build conversation history for this thread
    const sessionId = threadId || leadEmail; // fall back to email if no threadId
    const history = await getThreadHistory(sessionId);

    // Save the incoming user message to thread history
    await saveThreadMessage(sessionId, leadEmail, "user", textBody);

    // Build messages array: history + current message
    const messages = [
      ...history,
      { role: "user", content: textBody },
    ];

    // Generate AI reply
    const systemPrompt = buildSystemPrompt(businessName);
    const aiReplyDraft = await generateReply(systemPrompt, messages);

    if (!aiReplyDraft) {
      return NextResponse.json({ error: "AI returned empty reply" }, { status: 500 });
    }

    // Save AI reply to thread history
    await saveThreadMessage(sessionId, leadEmail, "assistant", aiReplyDraft);

    // ActiveCampaign: tag + move deal
    if (lead) {
      try {
        const contactRes = await upsertContact(leadEmail, lead.businessName, "Business");
        const contactId = contactRes.contact?.id;
        if (contactId) {
          await addTagToContact(contactId, "AI_REPLY_READY");
          await addTagToContact(contactId, "email replied");
          const dealsRes = await getDealsByContact(contactId);
          const openDeal = dealsRes.deals?.find((d: any) => d.status === "0");
          if (openDeal) {
            await updateDealStage(openDeal.id, STAGE_NEGOTIATING);
            console.log(`[Closer] Moved Deal ${openDeal.id} to Negotiating`);
          }
        }
      } catch (acErr: any) {
        // AC failure should not break the reply
        console.warn("[Closer] ActiveCampaign update failed:", acErr.message);
      }
    }

    const durationMs = Date.now() - start;
    console.log(`[Closer] Reply generated in ${durationMs}ms for ${leadEmail}`);

    return NextResponse.json({
      message: "Reply processed. Deal moved to Negotiating.",
      draftedReply: aiReplyDraft,
      threadId: sessionId,
      durationMs,
    });
  } catch (error: any) {
    console.error("Closer Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}
