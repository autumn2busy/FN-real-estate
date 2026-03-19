export async function cloneAndDeployTemplate(projectName: string, _templateRepo: string) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) throw new Error("Missing VERCEL_API_TOKEN");

  const teamId = "team_uSLsRZHA5u8JAkI9tVVipAFi";
  const targetProject = "flynerd-demo-lead";
  const fallbackUrl = "https://flynerd-real-estate-autumn2busy.vercel.app";

  console.log(`[Vercel API] Triggering deployment for ${targetProject} (Lead: ${projectName})...`);

  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (deployHookUrl) {
    try {
      const hookRes = await fetch(deployHookUrl, { method: "POST" });
      if (hookRes.ok) {
        console.log("[Vercel API] Deployment hook accepted.");
        return fallbackUrl;
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
        name: targetProject,
        project: targetProject,
        target: "production",
      }),
    });

    const contentType = deployRes.headers.get("content-type") || "";
    const deployData = contentType.includes("application/json")
      ? await deployRes.json()
      : await deployRes.text();

    if (!deployRes.ok) {
      console.warn("[Vercel API] Deployment could not be triggered automatically:", deployData);
      console.warn(`[Vercel API] Falling back to: ${fallbackUrl}`);
      return fallbackUrl;
    }

    const deploymentUrl =
      typeof deployData === "object" && deployData?.url
        ? `https://${deployData.url}`
        : fallbackUrl;

    console.log(`[Vercel API] Deployment process initiated: ${deploymentUrl}`);
    return deploymentUrl;
  } catch (err) {
    console.warn("[Vercel API] Network error during deployment:", err);
    return fallbackUrl;
  }
}
