export const AC_CONFIG = {
  apiUrl: process.env.ACTIVECAMPAIGN_URL || "",
  apiKey: process.env.ACTIVECAMPAIGN_KEY || "",
};

export async function upsertContact(email: string, firstName: string, lastName: string, phone?: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/contact/sync`, {
    method: "POST",
    headers: {
      "Api-Token": AC_CONFIG.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        email,
        firstName,
        lastName,
        phone,
      },
    }),
  });
  return res.json();
}

export async function addTagToContact(contactId: string, tagName: string) {
  // 1. First get or create the tag ID
  const tagRes = await fetch(`${AC_CONFIG.apiUrl}/api/3/tags`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ tag: { tag: tagName, tagType: "contact" } }),
  });
  const tagData = await tagRes.json();
  const tagId = tagData.tag?.id;

  if (!tagId) return null;

  // 2. Associate tag with contact
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/contactTags`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      contactTag: {
        contact: contactId,
        tag: tagId,
      },
    }),
  });
  return res.json();
}

export async function updateContactField(contactId: string, fieldId: string, value: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/fieldValues`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      fieldValue: {
        contact: contactId,
        field: fieldId,
        value: value,
      },
    }),
  });
  return res.json();
}
