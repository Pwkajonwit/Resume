async function เริ่มLIFF() {
    const liffId = window.APP_CONFIG.LIFF.LIFF_ID;

    try {
        await liff.init({ liffId });

        // ถ้า login แล้ว ให้ดึงข้อมูลมา
        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            window.__LIFF_PROFILE__ = {
                lineUserId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl || ""
            };
        } else {
            // ถ้าเป็น LINE App ปกติ มันจะแสดงเป็น in client แล้วระบบควรบังคับล็อกอิน 
            // แต่ถ้าคนเปิดผ่านเบราว์เซอร์ปกติ และยังไม่ได้ล็อกอิน ให้ปล่อยผ่านไปเป็น Guest
            // เพื่อไม่ให้รบกวนการทำงาน (ยกเลิกการบังคับ liff.login() ตรงนี้)
            console.log("LIFF initialized but not logged in. Running as Guest.");
        }
    } catch (error) {
        console.warn("LIFF init failed (Running as Guest):", error);
    }
}