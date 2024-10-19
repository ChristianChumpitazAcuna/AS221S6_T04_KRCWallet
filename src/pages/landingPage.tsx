import {
	Benefits,
	Conclusions,
	Description,
	Objectives,
	TeamMembers,
} from "@/components/landing/landing";
import NavBar from "@/components/landing/navBar";

export default function LandingPage() {
	return (
		<section className="w-full h-full bg-neutral-200 dark:bg-neutral-900">
			<NavBar />
			<Description />
			<Objectives />
			<Benefits />
			<TeamMembers />
			<Conclusions />
		</section>
	);
}
