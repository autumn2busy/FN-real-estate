export async function generateAvatarVideo(scriptText: string, businessName: string) {
  const apiKey = process.env.HEYGEN_API_KEY;

  if (process.env.HEYGEN_MOCK_MODE === "true") {
    console.log(`[HeyGen Mock] Simulating video generation for ${businessName}...`);
    return `https://app.heygen.com/share/mock-video-${Date.now()}`;
  }

  if (!apiKey) throw new Error("HEYGEN_API_KEY is missing");

  const avatarId = process.env.HEYGEN_AVATAR_ID || "Imelda_Business_Front_public";
  const lookId = process.env.HEYGEN_LOOK_ID;
  const spaceId = process.env.HEYGEN_SPACE_ID;
  const voiceId = process.env.HEYGEN_VOICE_ID || "6e05e310c3f14ed4ba1545578ce82ff6";

  const character: Record<string, string> = {
    type: "avatar",
    avatar_style: "normal",
  };

  let characterMode: "avatar" | "look" = "avatar";
  let modeSource = process.env.HEYGEN_AVATAR_ID ? "HEYGEN_AVATAR_ID" : "HEYGEN_AVATAR_ID (default)";

  if (lookId) {
    characterMode = "look";
    modeSource = spaceId ? "HEYGEN_LOOK_ID + HEYGEN_SPACE_ID" : "HEYGEN_LOOK_ID";
    character.look_id = lookId;
    if (spaceId) {
      character.space_id = spaceId;
    }
  } else {
    character.avatar_id = avatarId;
  }

  console.log(`[HeyGen API] Submitting video generation job for ${businessName}...`);
  console.log(
    `[HeyGen API] Character mode selected: ${characterMode} (source: ${modeSource}). Env status -> HEYGEN_AVATAR_ID: ${
      process.env.HEYGEN_AVATAR_ID ? "set" : "unset (using default)"
    }, HEYGEN_LOOK_ID: ${lookId ? "set" : "unset"}, HEYGEN_SPACE_ID: ${spaceId ? "set" : "unset"}.`,
  );

  const submitRes = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character,
          voice: {
            type: "text",
            input_text: scriptText,
            voice_id: voiceId,
          },
        },
      ],
      aspect_ratio: "16:9",
      title: `Flynerd Demo Walkthrough - ${businessName}`,
    }),
  });

  const submitData = await submitRes.json();

  if (!submitRes.ok) {
    console.error("[HeyGen API] Failed to generate video:", submitData);
    return `https://share.heygen.com/fallback-video-${Date.now()}`;
  }

  const videoId = submitData.data?.video_id;
  if (!videoId) {
    console.warn("[HeyGen API] Missing video_id in response:", submitData);
    return `https://share.heygen.com/fallback-video-${Date.now()}`;
  }

  console.log(`[HeyGen API] Video Generation Started. ID: ${videoId}. Polling for completion...`);

  let status = "processing";
  let attempts = 0;
  let completedVideoUrl = "";
  let failureReason = "";
  const maxAttempts = 20; // 10 minutes max (30s * 20)

  while ((status === "processing" || status === "waiting" || status === "pending") && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    attempts++;

    try {
      const statusRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        method: "GET",
        headers: { "X-Api-Key": apiKey },
      });

      const contentType = statusRes.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await statusRes.text();
        console.warn(`[HeyGen API] Received non-JSON response (Status: ${statusRes.status}):`, text.slice(0, 140));
        continue;
      }

      const statusData = await statusRes.json();
      if (!statusRes.ok) {
        console.warn("[HeyGen API] Polling request failed:", statusData);
        continue;
      }

      const rawStatus = statusData?.data?.status || statusData?.status || "processing";
      status = String(rawStatus).toLowerCase();

      failureReason =
        statusData?.data?.error ||
        statusData?.data?.error_message ||
        statusData?.error ||
        failureReason;

      completedVideoUrl =
        statusData?.data?.video_url ||
        statusData?.data?.url ||
        statusData?.data?.share_url ||
        completedVideoUrl;

      console.log(`[HeyGen API] Polling attempt ${attempts}/${maxAttempts}: ${status}`);
    } catch (err) {
      console.warn("[HeyGen API] Polling error:", err);
    }
  }

  if (status === "completed") {
    console.log("[HeyGen API] Video completed! Link ready.");
    return completedVideoUrl || `https://app.heygen.com/share/${videoId}`;
  }

  if (status === "failed") {
    console.warn(`[HeyGen API] Video generation failed: ${failureReason || "No reason returned by HeyGen."}`);
  }

  console.warn(`[HeyGen API] Video still in ${status} after ${attempts} attempts. Returning fallback link.`);
  return completedVideoUrl || `https://app.heygen.com/share/${videoId}`;
}
