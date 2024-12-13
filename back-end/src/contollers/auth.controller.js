export const signup = (req, res) => {
    const{fullName,email,password} = req.body 
    try {
        if (password.lenght < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }


    } catch (error) {

    }
}

export const login = (req, res) => {
    res.send("login route" )
}

export const logout = (req, res) => {
    res.send("logout route" )
}