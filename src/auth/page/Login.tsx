import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useForm } from "react-hook-form";
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeLogin } from 'types/type'
import { SchemaLogin } from '../../schema/schema';
export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<TypeLogin>({
        resolver: zodResolver(SchemaLogin)
    });
    const onSubmit = async (data: TypeLogin) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data, {
                withCredentials: true
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("nama", response.data.data.nama);
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            return console.log("kesalahan api")
        }
    }
    return (
        <>
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <Header propsJudul='INVOIX' propsDeskipsi='Invoice Management System' />
                    {/* End Header */}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div className="text-center mb-8">
                            <h2 className='text-3xl font-black'>LOGIN</h2>
                            <p className='text-muted-foreground text-sm mt-2 font-bold'>
                                Sign in to your account
                            </p>
                        </div>
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="" className='block font-bold uppercase text-sm'>Email</label>
                            <div className="relative">
                                <Mail size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                                <input {...register('email')} type="text" id='email' name='email' placeholder='Enter Your Email' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                                {errors.email && <span className='text-red-500 mt-2'>Email Wajib Diisi</span>}
                            </div>
                        </div>
                        {/* End Email */}
                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="" className='block font-bold uppercase text-sm'>PASSWORD</label>
                            <div className="relative">
                                <Lock size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                                <input {...register('password')} type="password" id='password' placeholder='*****' name='password' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                                {errors.password && <span className='text-red-500 mt-2'>Password Wajib Diisi</span>}
                                <button type='button' className='absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors' aria-label='Toggle password visibility'>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {/* End Password */}

                        {/* Login Button */}
                        <button type='submit' className='w-full bg-gray-50 text-black border-2 border-primary px-6 py-4 font-black text-lg uppercase hover:bg-foreground hover:text-background transition-all'>
                            LOGIN
                        </button>
                        {/* End Login Button */}
                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 border-t-2 border-border" />
                            <p className='text-muted-foreground font-bold uppercase'>OR</p>
                            <div className="flex-1 border-t-2 border-border" />
                        </div>
                        {/* End Divider */}
                        {/* Registraion Link */}
                        <div className="text-center">
                            <p className='text-muted-foreground text-sm font-bold mb-3'>
                                Don't have an account?
                            </p>
                            <Link to={"/register"}>
                                <button type='submit' className='w-full bg-gray-50 px-6 py-4 font-black text-lg uppercase hover:bg-foreground hover:text-background transition-all'>
                                    CREATE ACCOUNT
                                </button>
                            </Link>
                        </div>
                        {/* End Registraion Link */}
                    </form>
                    {/* End Form */}

                    <div className='mt-12 pt-8 border-t-4 border-border text-center'>
                        <p className='text-muted-foreground text-xs font-bold'>
                            By signing in, you agree to our Terms of Service and Privacy
                            Policy
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
