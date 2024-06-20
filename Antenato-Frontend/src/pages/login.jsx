import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


const LOGIN_URL = '/login';


const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email,pwd }), {
                    headers: { "Content-Type": "application/json", },
                    withCredentials : true
                });
            const user = response.data.user;
            console.log(user);
            setEmail(user.email);
            setAuth(user);
            localStorage.setItem('accesstoken', 'Bearer ' + response.data.accesstoken);
            setPwd('');
            setEmail('');
            navigate('/dashboard');

        } catch (error) {
            if (!error.response) setErrMsg('No response received');
            else {
                if (error.response == 401) setErrMsg('Unauthorized');
                else {
                    setErrMsg('Invalid username or password');
                }
            }
        }
    }

    return (
        <section className="bg-gradient-to-b from-gradstart to-gradend">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <p ref={errRef} className={errMsg ? "text-red-500 mb-4" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">Sign In</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="mt-2 w-full bg-primary-600 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center border border-gray-300"
                                >Sign In</button>
                            </div>

                        </form>
                        <p className="text-right text-gray-500 hover:underline cursor-pointer">
                            {/* <Link> forgot password?</Link> */}
                            Forgot password?
                        </p>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {`Don't have an Account?`}<br />
                            <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                <a href="">Sign Up</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )

}

export default Login;