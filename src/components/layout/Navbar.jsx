import NavLink from "../NavLink";

export default function NavbarComponent() {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blogs", path: "/blogs" },
    { title: "Contact", path: "/contact" },
  ];
  return (
    <nav className="flex items-center justify-center gap-4 w-1/2 *:transition-all *:hover:text-primary">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={"hover:text-primary hover:translate-y-0.5"}
          activeClass={"text-primary font-semibold hover:translate-y-0!"}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}
