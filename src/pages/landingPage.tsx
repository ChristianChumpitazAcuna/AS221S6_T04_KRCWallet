import Header from "@/components/shared/header";
import {
	Benefits,
	Conclusions,
	Description,
	Objectives,
	TeamMembers,
} from "@/components/landing/landing";

export default function LandingPage() {
	return (
		<section className="w-full h-screen bg-neutral-200 dark:bg-neutral-900">
			<Header />
			<section className="px-10 pt-4 pb-4">
				<Description />
				<Objectives />
				<Benefits />
				<TeamMembers />
				<Conclusions />
			</section>
		</section>
	);
}
