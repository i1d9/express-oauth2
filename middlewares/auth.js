
const ClientModel = require('../schemas/client');
function check_current_user(request, response, next) {

    if (request.session.current_user) {
        next();
    } else {
        response.redirect("/login");
    }

};



function get_oauth_client(request, response, next) {

    if (request.query.hasOwnProperty("client_id")) {



        ClientModel.find({ _id: request.query.client_id}).then((client) => {
            next();

        }).catch((error) => {
            
            console.log(error);
            response.redirect(`${request.redirect_uri}?error=invalid_request&state=${request.state || ""}`);

        });
        

    } else {
        response.redirect(`${request.redirect_uri}?error=invalid_request&state=${request.state || ""}`);
    }




};



module.exports = {
    check_current_user,
    get_oauth_client
};