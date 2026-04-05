   const adminMiddleware = (req , res , next) => {
   const password = req.header("admin-password");

   const passPhrase = process.env.ADMIN_PASSWORD;
   if (password === passPhrase){
    console.log("given access")
    next();
   }else {
    return res.status(400).send("only admin can access dashboard")
   }
};

module.exports = adminMiddleware;