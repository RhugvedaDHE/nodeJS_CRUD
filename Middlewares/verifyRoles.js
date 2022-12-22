const verifyRoles = (...allowedRoles) => {
    console.log("heyyyyyyyy");
    return (req, res, next) =>{
        var userRoles = req.user.roles;
        

        req.roles = userRoles;
        if(!req?.roles) return res.sendStatus(401);

        const rolesArray = [...allowedRoles];
        console.log("rolesArray: ", rolesArray);
        console.log("roles: ", req.roles);

        // const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
       
        // userRoles.forEach(function(role) {
        const flag = [];
        for (const key in userRoles) {
            console.log(userRoles[key]);
            if(allowedRoles.includes(userRoles[key])){
                flag.push(true);
            } 
            else{
                flag.push(false);
            }
        }
        if(flag.includes(true)){
            next();
        }
        else{
            return res.sendStatus(401)
        }
    }
}

module.exports = verifyRoles;