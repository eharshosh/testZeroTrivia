export const fetchQuestions = async (file: File) => {
    const form = new FormData();
    form.append("test", file);
    const response = await fetch("/questions", {
        method: "POST", 
        body: form
    });
    return response.json();
};
