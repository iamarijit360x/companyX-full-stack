import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';
import { loginAction } from '@/actions/authActions';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/middleware/authContext';
import { Label } from '@/components/ui/lable';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
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
        try {
            const res = await loginAction(credentials);
            login(res);
            toast({
                title: 'Success',
                description: 'Welcome back, Admin!',
            });
            navigate('/admin/');
        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Error',
                description: 'Invalid credentials. Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
            <div className="w-full max-w-md space-y-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-black ">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Admin Dashboard
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleInputChange}
                                        placeholder="admin@company.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign in
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            <a href="#" className="text-primary hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminLogin;