/* service file for the courses.has fucntiond fetchourse which returns a list of all available courses. enrollCourse-
used to register the user to a specific course by taking the course id. fetchModules-returns a list of all modules within specific course
by using its d....fetchLessons gets all lessons withing a module...fetchlessonDetail returns the content of the lessons..
fetchEnrelledcourse returns all courses user has registered for...submitLessonQuiz--sends user responses to the quizes(questions and selected answers)
lesson progress returns user achievements on a particular lesson...fetchAchievemnts returns users achievements on certain course
*/

import api from "./app";


export const fetchCourses = () =>{
    return api.get('courses/')
}

export const enrollCourse = (courseId) => {
  return api.post(`/courses/${courseId}/enroll/`);
};

export function fetchModules(courseId) {
  return api.get(`/courses/${courseId}/modules/`);
}

export function fetchLessons(moduleId) {
  return api.get(`/modules/${moduleId}/lessons/`);
}

export function fetchLessonDetail(lessonId){
  return api.get(`/lessons/${lessonId}`)
}

export const  fetchEnrolledCourses = () => {
  return api.get('/my-courses/');
};

export const submitLessonQuiz = (payload) => {
  return api.patch(`/lesson-progress/submit/`, payload);
};

export const fetchLessonProgress = (lessonId) => {
  return api.get(`/lesson-progress/by-lesson/${lessonId}/`);
};
export const fetchAchievements = () => {
  return api.get('achievements/');
};