import { useMutation } from "@tanstack/react-query";
import { login } from "./functions";


const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};








export {useLogin};