import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
export default function RegisterPage() {
    const [showPassword, SetShowPassword] = useState<boolean>(false);
    return (
        <div className="min-h-screen bg-background text-muted-foreground flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Header propsJudul='INVOIX' propsDeskipsi='Invoice Management System' />

                <form action="" className='space-y-6'>
                    <div className="text-center mb-8">
                        <h2 className='text-3xl font-bold text-black'>CREATE ACCOUNT</h2>
                        <p className='text-muted-foreground text-sm mt-2 font-bold'>
                            Join us to start managing invoices
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="" className='block font-bold uppercase text-sm text-black'>FULL NAME</label>
                        <div className="relative">
                            <User size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                            <input type="text" id='username' placeholder='Enter Your username' name='username' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="" className='block font-bold uppercase text-sm text-black'>EMAIL</label>
                        <div className="relative">
                            <Mail size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                            <input type="email" id='email' placeholder='Enter your mail' name='email' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="" className='block font-bold uppercase text-sm text-black'>PASSWORD</label>
                        <div className="relative">
                            <Lock size={20} className='absolute left-4 top-3.5 text-muted-foreground pointer-events-none' />
                            <input type="password" id='password' placeholder='*****' name='password' className='w-full pl-12 pr-4 py-3 border-border bg-background text-foreground font-bold' />
                            <button type='button' className='absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors' aria-label='Toggle password visibilty'>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Term */}
                    <div className="border-2 border-border p-4 space-y-3">
                        <label htmlFor="" className='flex items-start gap-3 cursor-pointer'>
                            <input type='checkbox' className='w-5 h-5 border-2 border-border cursor-pointer mt-0.5' />
                            <span className='text-sm font-bold leading-relaxed'>
                                I agree to the{" "}
                                <button type='button' className='text-primary hover:underline transition-colors'>
                                    Terms of Service
                                </button>{" "}
                                and {" "}
                                <button type='button' className='text-primary hover:underline transition-colors'>
                                    Privacy Policy
                                </button>
                            </span>
                        </label>
                    </div>

                    {/* Create Button */}
                    <button className='w-full bg-primary text-primary-foreground border-2 border-primary px-6 py-4 font-black text-lg uppercase hover:text-background transition-all'>
                        CREATE ACCOUNT
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className='flex-1 border-t-2 border-border' />
                        <p className='text-muted-foreground uppercase text-sm'>OR</p>
                        <div className='flex-1 border-t-2 border-border' />
                    </div>

                    {/* Login form */}
                    <div className="text-center">
                        <p className='text-muted-foreground text-sm font-bold mb-3'>
                            Already have an account?
                        </p>
                        <Link to={"/login"}>
                            <button type='submit' className='w-full bg-primary-foreground text-primary border-2 border-primary px-6 py-4 font-black text-lg uppercase hover:text-primary transition-all'>
                                SIGN IN
                            </button>
                        </Link>
                    </div>
                </form>

                {/* fOOTER */}
                <div className="mt-12 oy-8 border-t-2 border-border text-center py-4 px-12">
                    <p className='text-muted-foreground text-xs font-bold'>
                        Your information is secure and encrypted
                    </p>
                </div>
            </div>
        </div>
    )
}
