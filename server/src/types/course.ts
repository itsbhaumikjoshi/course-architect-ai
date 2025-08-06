export type ILLMResponse = {
    title: string,
    description: string,
    modules: IModule[],
};

export type IModule = {
    id: number,
    title: string,
    lessons: ILesson[]
};

export type ILesson = {
    type: string,
    text?: string,
    url?: string,
    code?: string,
    mcq?: IMCQ[],
};

export type IMCQ = {
    question: string,
    option: string[],
    answer: string
};

export type ICreateCourseFromLLMResponse = {
    userId: string,
    input: string
};

export type IDeleteCourse = {
    userId: string,
    courseId: string
};


export type ICreateCourse = {
    title: string,
    description: string,
    userId: string,
};

export type ICourse = {
    id: string,
    created_at: Date,
    title: string,
    description: string,
};

export type IFindCourseByModuleId = {
    id: string,
    moduleId?: string,
    userId: string
};

export type ICourseModuleResponse = {
    title: string,
    
};

export type IFindCourseById = {
    id: string,
    userId: string;
};

export type ICreateModule = {
    id: number,
    title: string,
    courseId: string,
};

export type GetModule = {
    id: string,
}

export type ICreateLesson = {
    content: string,
    moduleId: string,
};
