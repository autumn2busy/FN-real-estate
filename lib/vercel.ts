export async function cloneAndDeployTemplate(projectName: string, _templateRepo: string) {
  const fallbackUrl = "https://flynerd-real-estate-autumn2busy.vercel.app";
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  console.log(`[Vercel API] Triggering deployment for flynerd-demo-lead (Lead: ${projectName})...`);

  if (!deployHookUrl) {
    console.warn("[Vercel API] Missing VERCEL_DEPLOY_HOOK_URL. Skipping API deployment trigger and using fallback URL.");
    return fallbackUrl;
  }

  try {
    const deployRes = await fetch(deployHookUrl, { method: "POST" });
    const contentType = deployRes.headers.get("content-type") || "";
    const deployData = contentType.includes("application/json")
      ? await deployRes.json()
      : await deployRes.text();

    const contentType = deployRes.headers.get("content-type") || "";
    const deployData = contentType.includes("application/json")
      ? await deployRes.json()
      : await deployRes.text();

    if (!deployRes.ok) {
      console.warn("[Vercel API] Deploy hook rejected request:", deployData);
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
    console.warn("[Vercel API] Network error during deploy hook call:", err);
    console.warn(`[Vercel API] Falling back to: ${fallbackUrl}`);
    return fallbackUrl;
  }
}
