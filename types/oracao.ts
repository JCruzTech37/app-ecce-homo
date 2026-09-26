export type Oracao = {
  id: string;
  slug: string;
  titulo: string;
  descricao?: string;
  texto: string;
  imagemVertical: string;
  textoAlternativo: string;
  jaculatoria: string;
  fraseSanto?: string;
  fraseSantoAutor?: string;
  tags: string[];
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
};
