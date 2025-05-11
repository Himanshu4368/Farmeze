const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOtp = async(phone,otp) =>
{
    try{
        const message = await client.messages.create({
            body: `Your Farmeze OTP is ${otp}. It will expire in 5 minutes`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone.startsWith("+") ? phone: `+91${phone}`,
        });

        console.log("OTP Sent via Twilio", message.sid);
    } catch(err)
    {
        console.error("Twilio SMS Failed:", err.message);
        throw new Error("Failed to send OTP via SMS");
    }
};

module.exports = sendOtp;