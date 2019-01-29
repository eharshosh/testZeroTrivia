export const fetchQuestions = (...args: any[]) => fetch("/questions").then((response) => response.json());
