import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';
import { loginAction } from '@/actions/authActions';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/middleware/authContext';
const AdminLogin = () => {
    const {login}=useAuth()
    const navigate=useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { toast } = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempted:', credentials);
        try {
            const res=await loginAction(credentials);
            console.log(res)
            login(res)
            toast({
                title: 'Login Successful',
                description: 'Welcome back, Admin!',
            });
            navigate('/admin/')
        } catch (error) {
            console.log(error)
            toast({
                title: 'Login Failed',
                description: 'Please check your credentials and try again.',
            });
        }
    };

    return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md"
                >
                    <Card className="shadow-2xl border-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                        className="pl-10"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        required
                                        className="pl-10"
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign In
                                </Button>
                            </form>
                            <div className="text-center mt-4">
                                <a href="#" className="text-sm hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
    );
};

export default AdminLogin;
