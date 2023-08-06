import jwt_decode from "jwt-decode";
import {useQuery} from "@tanstack/react-query"
import service from "@/service";


export default function useCurrentUser(){
    return useQuery({
        queryKey:[],
        queryFn:()=>{
            try {
                const token = localStorage.getItem("accessToken");
                if(!token) return null;
                const user = jwt_decode(token)
                const exp = (user as any).exp;
                if(Date.now()/1000>exp) service
                .post("auth/refresh-token",{refresh_token:localStorage.getItem("refreshToken")})
                .then((res) => res.data)
                .then(({ accessToken, refreshToken }) => {
                  localStorage.setItem("accessToken", accessToken);
                  localStorage.setItem("refreshToken", refreshToken);
                })
                return user;
            } catch (error) {
                console.log({error})
                return null;
            }
        }
    })
}