import { useMutation } from "@tanstack/react-query";
import { get, post } from "./axios";


const useGet = () => {
    return useMutation({
        mutationFn: get,
    });
};

const usePost = <T>() => {
    return useMutation({
        mutationFn: post<T>,
    });
};

export {usePost, useGet};