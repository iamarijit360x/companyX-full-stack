import { RecoilRoot } from "recoil";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { ChildrenProps } from "@/types/globals";

import { APP_NAME } from "@/lib/constants";
import { Toaster } from "../ui/toaster";
import { AuthProvider } from "@/middleware/authContext";

function providers({ children }: ChildrenProps) {
  return (
    <AuthProvider>
    <RecoilRoot>
     
      <ThemeProvider defaultTheme="system" storageKey={`${APP_NAME}-ui-theme`}>
        {children}
        <Toaster/>
      </ThemeProvider>
    </RecoilRoot>
    </AuthProvider>
   

  );
}

export default providers;
