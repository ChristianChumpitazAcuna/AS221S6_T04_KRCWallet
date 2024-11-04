import React, { useState } from "react";
import MetaMaskLogo from "../articles/MetamaskLogo";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"; 
import { FaFlagUsa, FaFlag, FaGlobeAmericas, FaFlagCheckered } from "react-icons/fa";
import useThemeStore from "@/store/themeStore"; // Asegúrate de que la ruta sea correcta

const SettingPage: React.FC = () => {
    const [language, setLanguage] = useState("es");
    const { theme, setTheme } = useThemeStore(); // Obtén theme y setTheme de tu store

    const handleLanguageChange = (lang: string) => setLanguage(lang);
    
    const handleThemeChange = (themeChoice: "light" | "dark") => setTheme(themeChoice as "light" | "dark");

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Configuraciones</h1>
            <div className="flex items-center space-x-8">
                <div className="h-[300px] w-[500px]">
                    <MetaMaskLogo />
                </div>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-medium mb-2">Idioma</h2>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <button
                                    onClick={() => handleLanguageChange("es")}
                                    className={`p-2 rounded-full border ${
                                        language === "es" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                    title="Español"
                                >
                                    <FaFlag className={`text-2xl ${theme === "dark" ? "text-black" : "text-gray-900"}`} />
                                </button>
                                <p className="mt-2 text-sm">Español</p>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => handleLanguageChange("en")}
                                    className={`p-2 rounded-full border ${
                                        language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                    title="Inglés"
                                >
                                    <FaFlagUsa className={`text-2xl ${theme === "dark" ? "text-black" : "text-gray-900"}`} />
                                </button>
                                <p className="mt-2 text-sm">Inglés</p>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => handleLanguageChange("fr")}
                                    className={`p-2 rounded-full border ${
                                        language === "fr" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                    title="Francés"
                                >
                                    <FaFlagCheckered className={`text-2xl ${theme === "dark" ? "text-black" : "text-gray-900"}`} />
                                </button>
                                <p className="mt-2 text-sm">Francés</p>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => handleLanguageChange("de")}
                                    className={`p-2 rounded-full border ${
                                        language === "de" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                    title="Alemán"
                                >
                                    <FaGlobeAmericas className={`text-2xl ${theme === "dark" ? "text-black" : "text-gray-900"}`} />
                                </button>
                                <p className="mt-2 text-sm">Alemán</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Tema</h2>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <button
                                    onClick={() => handleThemeChange("light")}
                                    className={`p-2 rounded-full border ${
                                        theme === "light" ? "bg-yellow-400 text-white" : "bg-gray-200"
                                    }`}
                                    title="Claro"
                                >
                                    <MdOutlineLightMode 
                                        className={`text-2xl ${theme === "dark" ? "text-gray-400" : "text-gray-900"}`} 
                                    />
                                </button>
                                <p className="mt-2 text-sm">Claro</p>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => handleThemeChange("dark")}
                                    className={`p-2 rounded-full border ${
                                        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"
                                    }`}
                                    title="Oscuro"
                                >
                                    <MdOutlineDarkMode 
                                        className={`text-2xl ${theme === "dark" ? "text-white" : "text-gray-600"}`} 
                                    />
                                </button>
                                <p className="mt-2 text-sm">Oscuro</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
