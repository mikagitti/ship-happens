'use client';
import "./globals.css";

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
