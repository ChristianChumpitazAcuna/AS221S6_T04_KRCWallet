import {
	FaRegLightbulb,
	FaRegHandPointRight,
	FaRegStar,
	FaUsers,
	FaLinkedin,
	FaGithub,
} from "react-icons/fa";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import "./../../background.css";

// Componente Descripción
export const Description = () => {
	return (
		<section className="h-screen w-full px-10 flex flex-col items-center justify-center heroBackground-dark">
			<div className="flex justify-center items-center">
				<div className="w-3/4">
					<h1 className="text-5xl font-bold mb-4">Bienvenido a KRC Wallet</h1>
					<div className="flex items-center space-x-4">
						<FaRegLightbulb className="text-4xl text-yellow-300" />
						<h2 className="text-3xl font-semibold">Descripción</h2>
					</div>
					<p className="text-lg darK:text-white text-gray-1000 mt-4">
						Bienvenido a la página de inicio de KRC Wallet. Esta aplicación
						permite gestionar tu cuenta de criptomonedas, realizar
						transferencias y consultar tu saldo de manera segura.
					</p>
					<div className="mt-10">
						<NavLink to="/app">
							<Button className="py-6 px-8 rounded-3xl text-xl">Empezar</Button>
						</NavLink>
					</div>
				</div>
				<img
					src="https://i.imgur.com/GgY6OGi.png"
					alt="Moneda"
					className="w-62 h-62 object-contain ml-8"
				/>
			</div>
		</section>
	);
};

// Componente Objetivos
export const Objectives = () => {
	return (
		<section className="h-screen w-full px-10 flex flex-col items-center justify-center">
			<div className="flex items-center space-x-4">
				<FaRegHandPointRight className="text-4xl text-blue-400" />
				<h2 className="text-3xl font-semibold">Objetivos</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				{[
					{
						text: "Facilitar la gestión de criptomonedas de forma accesible.",
						icon: "💻",
					},
					{
						text: "Permitir la transferencia rápida y segura de tokens.",
						icon: "⚡",
					},
					{
						text: "Proveer una interfaz intuitiva para los usuarios.",
						icon: "🖥️",
					},
				].map((objective, index) => (
					<div
						key={index}
						className="p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 flex flex-col 
                        items-center bg-blue-400 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800"
					>
						<span className="text-3xl mb-2">{objective.icon}</span>{" "}
						<p className="text-center dark:text-gray-300 text-black font-bold">
							{objective.text}
						</p>{" "}
					</div>
				))}
			</div>
			
		</section>
	);
};

// Componente Beneficios
export const Benefits = () => {
	return (
		<section className="h-screen w-full px-10 flex flex-col items-center justify-center">
			<div className="flex items-center space-x-4">
				<FaRegStar className="text-4xl text-purple-400" />
				<h2 className="text-3xl font-semibold">Beneficios</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
				{[
					{ text: "Interfaz fácil de usar.", icon: "👌" },
					{ text: "Transacciones rápidas y seguras.", icon: "⚡" },
					{
						text: "Compatibilidad con MetaMask y otros wallets populares.",
						icon: "🔗",
					},
					{ text: "Conectividad con contratos inteligentes.", icon: "🧩" },
				].map((benefit, index) => (
					<div
						key={index}
						className="p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 flex flex-col items-center
                         dark:bg-blue-900 dark:hover:bg-blue-800 bg-blue-400 hover:bg-blue-500"
					>
						<span className="text-3xl mb-2">{benefit.icon}</span>{" "}
						{/* Usar el emoticón específico */}
						<p className="text-center dark:text-gray-300 text-black font-bold">
							{benefit.text}
						</p>{" "}
						{/* Texto en negrita con emoticón */}
					</div>
				))}
			</div>
		</section>
	);
};

// Componente Integrantes del equipo
export const TeamMembers = () => {
	return (
		<section className="h-screen w-full px-10 flex flex-col items-center justify-center">
			<div className="flex items-center space-x-4">
				<FaUsers className="text-4xl text-green-400" />
				<h2 className="text-3xl font-semibold">Developers del equipo</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				{[
					{
						name: "Amir Arbieto Contreras",
						image: "https://i.imgur.com/BWQHmkJ.jpeg",
						linkedin:
							"https://www.linkedin.com/in/amir-ander-arbieto-contreras-823001239/",
						github: "https://github.com/AmirArbieto",
					},
					{
						name: "Christian Chumpitaz Acuña",
						image: "https://i.imgur.com/m0eZDEC.jpeg",
						linkedin:
							"https://www.linkedin.com/in/christian-jesus-chumpitaz-acu%C3%B1a-0a4192240/",
						github: "https://github.com/ChristianChumpitazAcuna",
					},
					{
						name: "Hebert Rivera Perez",
						image: "https://i.imgur.com/CrWjenY.jpeg",
						linkedin:
							"https://www.linkedin.com/in/hebert-alonso-rivera-perez-8141a223a/",
						github: "https://github.com/Harp09",
					},
				].map((member, index) => (
					<div
						key={index}
						className="p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 flex flex-col items-center 
                        bg-blue-400 border border-gray-300 dark:bg-blue-900 dark:hover:bg-blue-800"
					>
						<img
							src={member.image}
							alt={`Integrante ${member.name}`}
							className="w-full h-52 object-cover rounded-lg mb-4"
						/>
						<p className="text-center text-lg font-medium dark:text-gray-300 text-black">
							{member.name}
						</p>
						<div className="flex space-x-4 mt-2">
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaLinkedin className="text-2xl dark:text-blue-300 text-blue-600" />
							</a>
							<a href={member.github} target="_blank" rel="noopener noreferrer">
								<FaGithub className="text-2xl dark:text-gray-400 text-gray-800" />
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

// Componente Conclusiones
export const Conclusions = () => {
	return (
		<section className="h-screen w-full px-10 flex flex-col items-center justify-center">
			<div className="flex items-center space-x-4">
				<FaRegLightbulb className="text-4xl text-yellow-300" />
				<h2 className="text-3xl font-semibold">Conclusiones</h2>
			</div>
			
			<p className="text-lg dark:text-white text-gray-1000">
				KRC Wallet ofrece una plataforma eficiente y segura para la gestión de
				criptomonedas, asegurando una experiencia de usuario fácil y rápida.
			</p>
		</section>
		
	);
	
};
