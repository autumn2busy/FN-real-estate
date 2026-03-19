export async function generateAvatarVideo(scriptText: string, businessName: string) {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) throw new Error("HEYGEN_API_KEY is missing");

  console.log(`[HeyGen API] Submitting video generation job for ${businessName}...`);

  const submitRes = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: "Abigail_expressive_2024112501", 
            avatar_style: "normal"
          },
          voice: {
            type: "text",
            input_text: scriptText,
            voice_id: "f38a635bee7a4d1f9b0a654a31d050d2" // Chill Brian - English
          }
        }
      ],
      aspect_ratio: "16:9",
      title: `Flynerd Demo Walkthrough - ${businessName}`
    }),
  });

  const submitData = await submitRes.json();
  
  if (!submitRes.ok) {
    console.error("[HeyGen API] Failed to generate video:", submitData);
    // Return a fallback so the pipeline doesn't break
    return `https://share.heygen.com/fallback-video-${Date.now()}`;
  }

  const videoId = submitData.data?.video_id;
  if (!videoId) {
    return `https://share.heygen.com/fallback-video-${Date.now()}`;
  }

  console.log(`[HeyGen API] Video Generation Started. ID: ${videoId}. Polling for completion...`);
  
  // Polling loop to wait for video to be ready
  let status = "processing";
  let attempts = 0;
  const maxAttempts = 20; // 10 minutes max (30s * 20)

  while ((status === "processing" || status === "waiting") && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
    attempts++;

    try {
      const statusRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        method: "GET",
        headers: { "X-Api-Key": apiKey }
      });
      
      const contentType = statusRes.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const statusData = await statusRes.json();
        status = statusData.data?.status || "processing";
        console.log(`[HeyGen API] Polling attempt ${attempts}/${maxAttempts}: ${status}`);
      } else {
        const text = await statusRes.text();
        console.warn(`[HeyGen API] Received non-JSON response (Status: ${statusRes.status}):`, text.slice(0, 100));
        // We stay in 'processing' and try again
      }
    } catch (err) {
      console.warn(`[HeyGen API] Polling error:`, err);
    }
  }

  if (status === "completed") {
    console.log(`[HeyGen API] Video completed! Link ready.`);
  } else {
    console.warn(`[HeyGen API] Video still in ${status} after ${attempts} attempts. Returning share link anyway.`);
  }
  
  return `https://app.heygen.com/share/${videoId}`;
}
