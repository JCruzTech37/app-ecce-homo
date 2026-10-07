import Image from "next/image";
import styles from "@/components/logoMarca.module.css";

type LogoMarcaProps = {
  priority?: boolean;
};

export function LogoMarca({ priority = false }: LogoMarcaProps) {
  return (
    <Image
      src="/images/logo-ecce-homo.png"
      alt="Ecce Homo. Ad maiorem Dei gloriam"
      width={1983}
      height={793}
      priority={priority}
      className={styles.logo}
    />
  );
}
