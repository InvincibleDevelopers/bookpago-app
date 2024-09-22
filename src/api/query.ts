import { useMutation } from "@tanstack/react-query";
import { get, post } from "./axios";


const useGet = () => {
    return useMutation({
        mutationFn: get,
    });
};

const usePost = () => {
    return useMutation({
        mutationFn: post,
    });
};

export {usePost, useGet};