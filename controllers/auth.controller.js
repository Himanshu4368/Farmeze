const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOtp = require("../utils/sendOtp");

//Request OTP

exports.signupRequestOtp = async (req,res) =>
{
    const { phone, name }= req.body;

    if(!phone || !name)
    {
        return res.status(400).json({ message: "Phone and Name are required"});

        
    }
    try{
        const existingUser = await User.findOne({ phone });
        if(existingUser)
        {
            return res.status(400).json({ message: "User already exists with this Phone number"});

        }
        const user = new User({ phone, name });

        const otp = Math.floor(100000 + Math.random()* 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5*60*1000);

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        await sendOtp(phone,otp);

        // console.log(`OTP for ${phone}: ${otp}`);
        res.status(200).json({ message: "Signup OTP sent Successfully"});
    } catch(err)
    {
        res.status(500).json({message: "Server error", error: err.message});

    }
} 

exports.loginRequestOtp = async(req,res) =>
{
    const {phone} = req.body;

    if(!phone) 
    {
        return res.status(400).json({ message: "Phone number is Required"});

    }

    try{
        const user = await User.findOne({ phone });
        if(!user)
        {
            return res.status(400).json({message: "User not found, please signup first.."});
        }
        
        

        const otp = Math.floor(100000 + Math.random()* 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5*60*1000);

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        await sendOtp(phone,otp);

        // console.log(`OTP for ${phone}: ${otp}`);
        res.status(200).json({ message: "Login OTP sent Successfully"});

    } catch(err)
    {
        res.status(500).json({ message: "Server error", error: err.message });

    }
};

//Verify otp

exports.verifyOtp = async(req,res) => {
    const { phone, otp } = req.body;

    if(!phone || !otp) {
        return res.status(400).json({message: "Phone and OTP are required"});
    }
    try{
        let user = await User.findOne({ phone })

        if(!user || user.otp !== otp)
        {
            return res.status(400).json({message: "invalid OTP"});

        }
        if( user.otpExpiresAt < new Date())
        {
            return res.status(400).json({message: "OTP has Expired"});

        }
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            
            }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        

        res.status(200).json({
            message: "OTP verified, login Success!",
            token,
            user: {
                id: user._id,
                phone: user.phone,
            },
        });

    }
    catch(err)
    {
        return res.status(500).json({ message: "Server error", error: err.message});

    }
};