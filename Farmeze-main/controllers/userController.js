const User = require("../models/User");

//Getting my profile
exports.getMe = async(req,res) =>
{
    try{
        const user = await User.findById(req.user.id).select("-otp-otpExpiresAt");
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch(err)
    {
        res.status(500).json({message: "Server Error", error: err.message});

    }


};

//Update my profile

exports.updateProfile = async(req,res) =>
{
    const{name, address, email} = req.body;
    try{
        const user = await User.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }

        if(name) user.name = name;
        if(address) user.address = address;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({message: "Profile Updated successfully", user});



    } catch(err)
    {
        res.status(500).json({message: "Server error", error: err.message});

    }
};
