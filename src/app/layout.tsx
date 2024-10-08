import "@/styles/globals.css";
import { SignedOut, SignedIn, SignInButton, UserButton, ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { zhCN } from "@clerk/localizations";
// Step1 引入翻译文件
import zhCNlocales from "@/locales/zh.json"
import merge from "lodash.merge"
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // step2: 合并翻译文件
  const localization = merge(zhCN, zhCNlocales)
  return (
    <ClerkProvider localization={localization}>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            {/* <header>
              <SignedOut>
                <SignInButton >登录</SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header> */}
            <div className="flex  w-full items-center">{children}</div>
            <Toaster/>
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
