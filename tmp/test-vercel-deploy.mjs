const token = process.env.VERCEL_API_TOKEN;
const teamId = "team_uSLsRZHA5u8JAkI9tVVipAFi";
const targetProject = "flynerd-demo-lead";

async function testDeploy() {
  console.log("Triggering test deployment with gitSource...");
  try {
    const deployRes = await fetch(`https://api.vercel.com/v13/deployments?teamId=${teamId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test-deploy-git",
        project: targetProject,
        target: "production",
        gitSource: {
          type: "github",
          repo: "autumn2busy/FN-real-estate",
          ref: "main"
        }
      }),
    });

    const data = await deployRes.json();
    console.log("Status:", deployRes.status);
    console.log("Response Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Test Error:", err);
  }
}
testDeploy();
