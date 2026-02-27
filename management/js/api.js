async function เรียกAPI_POST(action, data) {
    const { GAS_WEBAPP_URL, API_KEY } = window.APP_CONFIG.API;

    // เปลี่ยนจาก application/json เป็น text/plain เพื่อหลีกเลี่ยง CORS Preflight request ใน Google Apps Script
    const res = await fetch(GAS_WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ apiKey: API_KEY, action, data })
    });

    const json = await res.json().catch(() => ({}));
    if (!json || json.ok !== true) throw new Error(json?.error || "API ผิดพลาด");
    return json;
}

async function โหลดDashboard(limit = 50) {
    const { GAS_WEBAPP_URL } = window.APP_CONFIG.API;
    const url = new URL(GAS_WEBAPP_URL);
    url.searchParams.set("action", "dashboard");
    url.searchParams.set("limit", String(limit));

    const res = await fetch(url.toString(), { method: "GET" });
    const json = await res.json().catch(() => ({}));
    if (!json || json.ok !== true) throw new Error(json?.error || "โหลดข้อมูลไม่สำเร็จ");
    return json.data;
}