import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <Header propsJudul='INVOIX' propsDeskipsi='Invoice Management System' />
                    {/* End Header */}

                    {/* Form */}
                    <form action="" className='space-y-6'>
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
                                <input type="text" id='email' name='email' placeholder='Enter Your Email' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                            </div>
                        </div>
                        {/* End Email */}
                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="" className='block font-bold uppercase text-sm'>PASSWORD</label>
                            <div className="relative">
                                <Lock size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                                <input type="password" id='password' placeholder='*****' name='password' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
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
