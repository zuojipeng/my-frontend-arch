import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/common";

const MainLayout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default memo(MainLayout);
