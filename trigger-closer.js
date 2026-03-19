// This script simulates n8n catching an email and forwarding it to the Closer Agent.

async function testCloserAgent() {
  console.log("Simulating an inbound email from a real estate lead...");

  // You must change this email to exactly match the contactEmail of a lead that exists
  // in your database, where the status is currently PITCHED or BUILT or PROSPECT.
  // For safety, you might want to manually edit a lead in Supabase/Prisma Studio
  // and set its contactEmail to "test@example.com" first.
  const testPayload = {
    From: "test@flynerd.tech", // Match the seeded record
    TextBody: "Hey, I saw the custom demo you built! It looks cool, but how much does a full website cost? We are a small plumbing company and on a budget."
  };

  try {
    // If your server is running on port 3000 locally
    const response = await fetch('http://localhost:3000/api/agents/closer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload)
    });

    const data = await response.json();
    console.log("\n[Closer Agent Response]:");
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error("Failed to connect to Localhost. Is 'npm run dev' running on port 3000?", error.message);
  }
}

testCloserAgent();
