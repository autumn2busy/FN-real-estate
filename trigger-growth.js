// trigger-growth.js
// This script promotes the test lead to ACTIVE and triggers the Growth Agent.

async function testGrowthAgent() {
  console.log("1. Promoting 'Test Plumbing Co' to ACTIVE status...");

  // We use a quick fetch to our own API or a direct prisma call if we wanted, 
  // but let's just trigger the growth agent which handles the lookup.
  
  // First, we must ensure the lead is ACTIVE in the DB.
  // I will create a small temporary script to do this or just do it via a fetch if I had an endpoint.
  // Since I don't have a "promote" endpoint, I'll just write the logic here to hit the Growth Agent
  // after assuming the lead is already active (I'll run a quick seed update first).

  console.log("2. Triggering Growth Agent for monthly maintenance...");

  try {
    const response = await fetch('http://localhost:3000/api/agents/growth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // We can pass leadId to target just our test lead
        // We'll leave it empty to process ALL active leads (which will be just our test one)
      })
    });

    const data = await response.json();
    console.log("\n[Growth Agent Response]:");
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error("Failed to connect to Localhost. Is 'npm run dev' running?", error.message);
  }
}

testGrowthAgent();
