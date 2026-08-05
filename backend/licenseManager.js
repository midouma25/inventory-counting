// استدعاء مكتبة dotenv في بداية الملف
require('dotenv').config();

const { machineIdSync } = require('node-machine-id');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

// 🔴 جلب الكلمة السرية من ملف .env
// أضفنا قيمة احتياطية (Fallback) كحماية إضافية في حال نسيان ملف .env
const SECRET_SALT = process.env.SECRET_SALT || "DEFAULT_BACKUP_SECRET_2026"; 

// مسار حفظ مفتاح التفعيل في حاسوب الزبون
const licensePath = path.join(app.getPath('userData'), 'system_license.key');

function getHardwareId() {
    try {
        const hwid = machineIdSync(true); 
        return hwid.toUpperCase();
    } catch (error) {
        console.error("Error reading hardware ID:", error);
        return "UNKNOWN_DEVICE";
    }
}

function generateExpectedKey() {
    const hwid = getHardwareId();
    // استخدام SECRET_SALT الذي جلبناه من المتغيرات
    const hash = crypto.createHash('sha256').update(hwid + SECRET_SALT).digest('hex');
    const rawKey = hash.substring(0, 20).toUpperCase();
    return `${rawKey.substring(0,5)}-${rawKey.substring(5,10)}-${rawKey.substring(10,15)}-${rawKey.substring(15,20)}`;
}

function checkIsActivated() {
    try {
        if (fs.existsSync(licensePath)) {
            const savedKey = fs.readFileSync(licensePath, 'utf8').trim();
            const expectedKey = generateExpectedKey();
            return savedKey === expectedKey;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function activateApp(userInputKey) {
    const expectedKey = generateExpectedKey();
    
    if (userInputKey.trim().toUpperCase() === expectedKey) {
        fs.writeFileSync(licensePath, userInputKey.trim().toUpperCase());
        return { success: true };
    }
    
    return { success: false, message: 'invalid_key' };
}

module.exports = { 
    getHardwareId, 
    checkIsActivated, 
    activateApp, 
    generateExpectedKey 
};