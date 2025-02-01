import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const {toast}=useToast();
  const [email,setEmail]=useState('')
  const navigate=useNavigate()
  const handleSubscribeToNewsLetter=()=>{
    if(!email)
    {
      toast({
        title:"Please Enter Email!",
        description:"Sorry But This Feature is not implemented yet",
        variant:'destructive'
      })
    }
    toast({
      title:"Subcribed to New Letter!",
      description:"Sorry But This Feature is not implemented yet"
    })
  }
  return (
    <footer className="border-t dark:border-gray-800 border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200">Company Name</h3>
            <p className="text-sm text-muted-foreground">
              We are a leading company in the industry, providing top-notch services and solutions to our clients.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {[
                ['Home', '/'],
                ['About Us', '/portfolio'],
                ['Services', '/service'],
                ['Careers', '/career'],
                ['Contact', '/contact-us'],
              ].map(([title, href]) => (
                <a
                  key={title}
                  onClick={()=>navigate(href)}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  {title}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200">Contact</h3>
            <div className="space-y-3 text-sm">
              <a 
                href="mailto:info@company.com" 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                info@company.com
              </a>
              <a 
                href="tel:+11234567890" 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                +1 (123) 456-7890
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Stay updated with our latest news and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input h-9"
              />
              <Button onClick={handleSubscribeToNewsLetter} variant="secondary" className="h-9">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;