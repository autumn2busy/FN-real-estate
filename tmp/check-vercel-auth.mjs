const token = process.env.VERCEL_API_TOKEN;
async function checkAuth() {
  const res = await fetch('https://api.vercel.com/v2/user', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("User Data:", JSON.stringify(data, null, 2));

  const teamsRes = await fetch('https://api.vercel.com/v2/teams', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const teamsData = await teamsRes.json();
  console.log("Teams Data:", JSON.stringify(teamsData, null, 2));
}
checkAuth();
