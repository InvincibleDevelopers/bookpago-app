import { useGet, usePost } from "@src/api/query";


const useAPI = () => {
    const getMutation = useGet();
    const postMutation = usePost();

    return {getMutation, postMutation};

};

export default useAPI;