async function เริ่มLIFF() {
    const liffId = window.APP_CONFIG.LIFF.LIFF_ID;

    // อ่านข้อมูลที่ส่งมาจากหน้าหลักตามลิ้งก์ (URL Parameters) เท่านั้น
    const urlParams = new URLSearchParams(window.location.search);
    const uId = urlParams.get('userId');
    const dName = urlParams.get('displayName');

    if (uId && dName) {
        window.__LIFF_PROFILE__ = {
            lineUserId: uId,
            displayName: decodeURIComponent(dName)
        };
    } else {
        window.__LIFF_PROFILE__ = null;
    }

    try {
        // Init LIFF เพื่อให้สามารถส่งข้อความ liff.sendMessages(...) ได้
        await liff.init({ liffId });
    } catch (error) {
        console.warn("LIFF init failed:", error);
    }
}