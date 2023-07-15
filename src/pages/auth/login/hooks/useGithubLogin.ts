import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "firebaseConfig";

export const useGithubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {

        await signInWithPopup(auth,provider);
    } catch (e) {
        console.log("error",e)
    }
}