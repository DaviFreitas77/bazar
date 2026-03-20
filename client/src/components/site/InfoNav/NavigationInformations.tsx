import { NavLink } from "react-router-dom";

export function NavigationInformation() {
    const sessions = [
        { title: "Políticas de privacidade", path: "/politicas-de-privacidade" },
        { title: "Sobre nós", path: "/sobre-nos" },
        { title: "Termos de uso", path: "/termos" },
    ];

    return (
        <section className="flex justify-center items-center mt-10">
            <div className="flex gap-4">
                {sessions.map((session) => (
                    <NavLink
                        key={session.path}
                        to={session.path}
                        className={({ isActive }) =>
                            `border rounded-full p-2 text-sm ${isActive ? "bg-primary-50 text-white " : "border-gray-200 text-gray-800"
                            }`
                        }
                    >
                        {session.title}
                    </NavLink>
                ))}
            </div>
        </section>
    )
}