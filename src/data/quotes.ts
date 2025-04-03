
export type Quote = {
  text: string;
  author: string;
};

export const romanticQuotes: Quote[] = [
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  {
    text: "I love you not only for what you are, but for what I am when I am with you.",
    author: "Roy Croft"
  },
  {
    text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss"
  },
  {
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn"
  },
  {
    text: "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.",
    author: "Franklin P. Jones"
  },
  {
    text: "Every heart sings a song, incomplete, until another heart whispers back.",
    author: "Plato"
  },
  {
    text: "If I know what love is, it is because of you.",
    author: "Hermann Hesse"
  },
  {
    text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
    author: "Leo Christopher"
  },
  {
    text: "Love is like the wind, you can't see it but you can feel it.",
    author: "Nicholas Sparks"
  },
  {
    text: "To love is nothing. To be loved is something. But to love and be loved, that's everything.",
    author: "T. Tolis"
  },
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * romanticQuotes.length);
  return romanticQuotes[randomIndex];
}
