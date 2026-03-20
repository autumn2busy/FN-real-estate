const FALLBACK_BASE_URL = "https://flynerd-demo-lead.vercel.app";

export function getCanonicalDemoUrl(leadId: string, deploymentHost?: string) {
  const base = deploymentHost ? `https://${deploymentHost}` : FALLBACK_BASE_URL;
  return `${base}/demo/${leadId}`;
}

export async function cloneAndDeployTemplate(
  projectName: string,
  _templateRepo: string,
  leadId: string
) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) throw new Error("Missing VERCEL_API_TOKEN");

  const teamId = "team_uSLsRZHA5u8JAkI9tVVipAFi";
  const targetProject = "flynerd-demo-lead";

  console.log(`[Vercel API] Triggering deployment for ${targetProject} (Lead: ${projectName})...`);

  // We keep the hook check just in case, but prioritize the API if it's not set
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (deployHookUrl) {
    try {
      const hookRes = await fetch(deployHookUrl, { method: "POST" });
      if (hookRes.ok) {
        console.log("[Vercel API] Deployment hook accepted.");
        return getCanonicalDemoUrl(leadId);
      }
      const hookText = await hookRes.text();
      console.warn(`[Vercel API] Deployment hook failed (${hookRes.status}): ${hookText.slice(0, 200)}`);
    } catch (err) {
      console.warn("[Vercel API] Deployment hook network error:", err);
    }
  }

  try {
    const deployRes = await fetch(`https://api.vercel.com/v13/deployments?teamId=${teamId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        project: targetProject,
        target: "production",
        gitSource: {
          type: "github",
          repo: "autumn2busy/FN-real-estate",
          ref: "main"
        }
      }),
    });

    const contentType = deployRes.headers.get("content-type") || "";
    const deployData = contentType.includes("application/json")
      ? await deployRes.json()
      : await deployRes.text();

    if (!deployRes.ok) {
      console.warn("[Vercel API] Deployment could not be triggered automatically:", deployData);
      const fallback = getCanonicalDemoUrl(leadId);
      console.warn(`[Vercel API] Falling back to: ${fallback}`);
      return fallback;
    }

    const deploymentHost =
      typeof deployData === "object" && deployData?.url ? deployData.url : undefined;
    const canonicalUrl = getCanonicalDemoUrl(leadId, deploymentHost);

    console.log(`[Vercel API] Deployment process initiated: ${canonicalUrl}`);
    return canonicalUrl;
  } catch (err) {
    console.warn("[Vercel API] Network error during deployment:", err);
    return getCanonicalDemoUrl(leadId);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// passwordProtectDeployment
// Called by the expiry cron/webhook. Sets password protection on the Vercel
// project via the Protection Bypass API so expired demos still exist but
// are gated behind a password (the lead's ID, rotated on re-grant).
// ─────────────────────────────────────────────────────────────────────────────
export async function passwordProtectDeployment(
  projectName: string,
  bypassSecret: string
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) return { ok: false, error: "Missing VERCEL_API_TOKEN" };

  const teamId = "team_uSLsRZHA5u8JAkI9tVVipAFi";

  try {
    // Enable Deployment Protection on the project
    const res = await fetch(
      `https://api.vercel.com/v9/projects/${projectName}?teamId=${teamId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordProtection: {
            deploymentType: "all",
            password: bypassSecret,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[Vercel] passwordProtectDeployment failed:", err);
      return { ok: false, error: err };
    }

    console.log(`[Vercel] Password protection enabled for project: ${projectName}`);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}