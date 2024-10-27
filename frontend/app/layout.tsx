import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
	title: "GoodbyeDPI UI",
	metadataBase: new URL("https://goodbyedpi-ui.vercel.app/"),
	description:
		"GoodbyeDPI UI предоставляет удобный графический интерфейс для управления GoodbyeDPI, Zapret, ByeDPI и SpoofDPI. С его помощью вы можете легко изменять настройки DPI и запускать приложение в трее.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`geist-mono geist-sans font-regular`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="sm:container mx-auto w-[95vw] h-auto">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
