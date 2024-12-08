export const speciesOptions = [
  "Perro",
  "Gato",
  "Ave",
  "Reptil",
  "Hamster",
  "Conejo",
  "Tortuga",
] as const;

export const breedOptions: Record<string, string[]> = {
  Perro: [
    "Labrador Retriever",
    "Pastor Alemán",
    "Bulldog",
    "Golden Retriever",
    "Poodle",
    "Chihuahua",
    "Yorkshire Terrier",
    "Rottweiler",
    "Boxer",
    "Otro"
  ],
  Gato: [
    "Siamés",
    "Persa",
    "Maine Coon",
    "Bengalí",
    "Ragdoll",
    "Sphynx",
    "Británico de Pelo Corto",
    "Azul Ruso",
    "Angora Turco",
    "Otro"
  ],
  Ave: [
    "Periquito",
    "Canario",
    "Loro Gris Africano",
    "Cacatúa",
    "Agapornis",
    "Guacamayo",
    "Ninfas",
    "Otro"
  ],
  Reptil: [
    "Iguana Verde",
    "Gecko Leopardo",
    "Dragón Barbudo",
    "Tortuga de Tierra",
    "Camaleón",
    "Serpiente de Maíz",
    "Otro"
  ],
  Hamster: [
    "Sirio",
    "Roborovski",
    "Campbell",
    "Chino",
    "Ruso",
    "Otro"
  ],
  Conejo: [
    "Holandés",
    "Mini Rex",
    "Cabeza de León",
    "Belier",
    "Angora",
    "Mini Lop",
    "Otro"
  ],
  Tortuga: [
    "Mediterránea",
    "Rusa",
    "Estrella India",
    "Orejas Rojas",
    "Carbonaria",
    "Otro"
  ],
};