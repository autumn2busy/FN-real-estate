async function runTest() {
  try {
    const response = await fetch('http://localhost:3000/api/agents/scout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche: 'plumbing', location: 'Miami' })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
runTest();
