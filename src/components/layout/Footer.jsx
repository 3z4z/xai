import { container } from "@/utils/classNames";

export default function FooterComponent() {
  return (
    <footer className="py-16 bg-primary/5 border-t border-t-primary/3 shadow-t-primary">
      <div className={container}>
        <small>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit, earum. Eveniet consequuntur reiciendis, reprehenderit
          rerum omnis ut necessitatibus suscipit neque fugit obcaecati quisquam
          porro atque ex nesciunt voluptas! Sit, ea.
        </small>
      </div>
    </footer>
  );
}
