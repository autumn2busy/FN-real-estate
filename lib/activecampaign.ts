export const AC_CONFIG = {
  apiUrl: process.env.ACTIVECAMPAIGN_URL || "",
  apiKey: process.env.ACTIVECAMPAIGN_KEY || "",
};

export async function upsertContact(email: string, firstName: string, lastName: string, phone?: string) {
  console.log(`[AC] Syncing contact: ${email} | Phone: ${phone}`);
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
  const data = await res.json();
  console.log(`[AC] Sync result:`, JSON.stringify(data, null, 2));
  return data;
}

export async function addTagToContact(contactId: string, tagName: string) {
  console.log(`[AC] Adding tag '${tagName}' to contact ${contactId}...`);
  // 1. First try to create the tag
  const tagRes = await fetch(`${AC_CONFIG.apiUrl}/api/3/tags`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ tag: { tag: tagName, tagType: "contact" } }),
  });
  const tagData = await tagRes.json();
  let tagId = tagData.tag?.id;

  // If tag already exists, search for it
  if (!tagId) {
    console.log(`[AC] Tag '${tagName}' might already exist, searching...`);
    const searchRes = await fetch(`${AC_CONFIG.apiUrl}/api/3/tags?search=${encodeURIComponent(tagName)}`, {
      method: "GET",
      headers: { "Api-Token": AC_CONFIG.apiKey },
    });
    const searchData = await searchRes.json();
    const found = searchData.tags?.find((t: any) => t.tag === tagName);
    tagId = found?.id;
  }

  if (!tagId) {
    console.error(`[AC] Could not create or find tag: ${tagName}`);
    return null;
  }

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
  const result = await res.json();
  console.log(`[AC] Tag association result:`, JSON.stringify(result, null, 2));
  return result;
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

export async function subscribeContactToList(contactId: string, listId: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/contactLists`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      contactList: {
        list: listId,
        contact: contactId,
        status: 1 // 1 = Active/Subscribed
      },
    }),
  });
  return res.json();
}

export async function createDeal(contactId: string, title: string, value: number, pipelineId: string = "1", stageId: string = "1") {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/deals`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      deal: {
        contact: contactId,
        title: title,
        value: value, // in cents (e.g. 250000 for $2,500)
        currency: "usd",
        group: pipelineId,
        stage: stageId,
        status: 0 // Open
      },
    }),
  });
  return res.json();
}

export async function updateDealField(dealId: string, fieldId: string, value: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/dealCustomFieldData`, {
    method: "POST",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      dealCustomFieldDatum: {
        dealId: dealId,
        customFieldId: fieldId,
        fieldValue: value,
      },
    }),
  });
  return res.json();
}

export async function getDealsByContact(contactId: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/contacts/${contactId}/deals`, {
    method: "GET",
    headers: { "Api-Token": AC_CONFIG.apiKey },
  });
  return res.json();
}

export async function updateDealStage(dealId: string, stageId: string) {
  const res = await fetch(`${AC_CONFIG.apiUrl}/api/3/deals/${dealId}`, {
    method: "PUT",
    headers: { "Api-Token": AC_CONFIG.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      deal: {
        stage: stageId,
      },
    }),
  });
  return res.json();
}

