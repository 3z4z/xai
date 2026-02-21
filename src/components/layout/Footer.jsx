import { container } from "@/utils/classNames";

export default function FooterComponent() {
  return (
    <footer className="py-8 bg-primary/5 border-t border-t-primary/3 shadow-t-primary">
      <div className={container}>
        <p className="text-center">
          Copyright &copy; 2026. All rights reserved to{" "}
          <a
            target="_blank"
            href="https://github.com/3z4z"
            className="text-primary"
          >
            Md. Salman Ezaz
          </a>
        </p>
      </div>
    </footer>
  );
}
