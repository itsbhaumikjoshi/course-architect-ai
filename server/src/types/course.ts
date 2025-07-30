export type LLMResponse = {
    title: string,
    description: string,
    modules: Module[],
};

export type Module = {
    title: string,
    lessons: Lesson[]
};

export type Lesson = {
    type: string,
    text?: string,
    url?: string,
    code?: string,
    mcq?: MCQ[],
};

export type MCQ = {
    question: string,
    option: string[],
    answer: string
};

export type CreateCompleteCourse = {
    userId: string,
    input: string
};

export type DeleteCourse = {
    userId: string,
    courseId: string
};


export type CreateCourse = {
    title: string,
    description: string,
    userId: string,
};

export type CourseResponse = {
    id: string,
    created_at: Date,
    title: string,
    description: string,
};