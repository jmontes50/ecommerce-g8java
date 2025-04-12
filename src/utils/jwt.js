import { jwtDecode } from "jwt-decode";

const getTimeExpToken = (jwt) => {
    try {
        const decode = jwtDecode(jwt);
        // console.log(decode);
        const currentTime = Date.now() / 1000;
        // console.log( currentTime < decode.exp )
        const response = {
            email: decode.email,
            isTokenValid: currentTime < decode.exp//true ó false
        }
        return response
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default getTimeExpToken;