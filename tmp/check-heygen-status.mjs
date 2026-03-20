const apiKey = process.env.HEYGEN_API_KEY;
const videoId = "b9dcfb5070cc4959aea0314450f46e63";

async function checkStatus() {
  const statusRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
  });
  const data = await statusRes.json();
  console.log(JSON.stringify(data, null, 2));
}
checkStatus();
