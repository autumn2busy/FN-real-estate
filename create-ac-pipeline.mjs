// create-ac-pipeline.mjs
// This script creates a custom Deal Pipeline and Stages for the Flynerd Agency CRM in ActiveCampaign.

const apiUrl = process.env.ACTIVECAMPAIGN_URL;
const apiKey = process.env.ACTIVECAMPAIGN_KEY;

if (!apiUrl || !apiKey) {
  console.error("Missing ACTIVECAMPAIGN_URL or ACTIVECAMPAIGN_KEY in .env");
  process.exit(1);
}

const headers = {
  "Api-Token": apiKey,
  "Content-Type": "application/json"
};

async function createPipelineAndStages() {
  console.log("1. Creating 'Flynerd Auto-Pilot' Pipeline...");
  
  const pipelineRes = await fetch(`${apiUrl}/api/3/dealGroups`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dealGroup: {
        title: "Flynerd Auto-Pilot",
        currency: "usd",
        allusers: 1,
        autoassign: 1
      }
    })
  });
  
  const pipelineData = await pipelineRes.json();
  if (!pipelineRes.ok) {
    console.error("Failed to create pipeline:", pipelineData);
    return;
  }
  
  const pipelineId = pipelineData.dealGroup.id;
  console.log(`✅ Pipeline Created! ID: ${pipelineId}`);
  
  // Create Stages
  const stages = [
    { title: "1. Outreach Pitched", order: 1 },
    { title: "2. Negotiating (AI Handled)", order: 2 },
    { title: "3. Closed Won", order: 3 }
  ];

  for (const stage of stages) {
    console.log(`Creating Stage: ${stage.title}...`);
    const stageRes = await fetch(`${apiUrl}/api/3/dealStages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        dealStage: {
          title: stage.title,
          group: pipelineId,
          order: stage.order
        }
      })
    });
    
    const stageData = await stageRes.json();
    if (stageRes.ok) {
      console.log(`✅ Stage '${stage.title}' Created! ID: ${stageData.dealStage.id}`);
      // If it's the first stage, we log it for the Outreach agent
      if (stage.order === 1) {
        console.log(`\n\n🎯 SUCCESS! Update your Outreach Agent to use:`);
        console.log(`Pipeline ID: ${pipelineId}`);
        console.log(`Initial Stage ID: ${stageData.dealStage.id}\n`);
      }
    } else {
      console.error("Failed to create stage:", stageData);
    }
  }
}

createPipelineAndStages();
